import { ref, readonly, Ref } from 'vue';

// State attributes START.
const audio: Ref<HTMLAudioElement | null> = ref(null);
const currentItem: Ref<object | null> = ref({});

const currentItemPlaybackTime: Ref<number> = ref(0);
const currentItemDuration: Ref<number> = ref(100);

const isPlaying: Ref<boolean> = ref(false);
// State attributes END.

export const useAudioPlayer = () => {
  // Methods START.
  const isAudio = () => {
    return audio.value !== null;
  };

  const isCurrentItem = (item: object) => {
    return currentItem.value.resource_id === item.resource_id;
  };

  const isAudioType = (item: object) => {
    return item.media_type === 'audio';
  };

  const setAudioSrc = (src: string) => {
    if (!isAudio()) {
      audio.value = new Audio(src);
      audio.value.addEventListener('timeupdate', () => {
        currentItemPlaybackTime.value = audio.value.currentTime;
      });
    } else if (audio.value.src !== src) {
      audio.value.setAttribute('src', src); //change the source
      audio.value.load(); //load the new source
    }
    audio.value.addEventListener('loadedmetadata', () => {
      currentItemDuration.value = audio.value.duration;
    });
  };

  const setCurrentItem = (item: object) => {
    currentItem.value = item;
  };

  const startAudio = (item: object) => {
    setCurrentItem(item);
    setAudioSrc(item.file);
    playAudio();
  };

  const playAudio = () => {
    if (isAudio()) {
      audio.value.play();
      isPlaying.value = true;
    }
  };

  const pauseAudio = () => {
    if (isAudio()) {
      audio.value.pause();
      isPlaying.value = false;
    }
  };

  const togglePlayPause = () => {
    if (isAudio()) {
      if (isPlaying.value) {
        pauseAudio();
      } else {
        playAudio();
      }
    }
  };
  // Methods END.

  return {
    audioPlayerState: readonly({
      audio: audio,
      currentItem: currentItem,
      isPlaying: isPlaying,
      currentItemPlaybackTime: currentItemPlaybackTime,
      currentItemDuration: currentItemDuration,
    }),
    isCurrentItem,
    isAudioType,
    setAudioSrc,
    startAudio,
    playAudio,
    togglePlayPause,
  };
};

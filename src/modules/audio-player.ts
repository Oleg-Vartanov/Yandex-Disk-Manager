import { ref, readonly, Ref, computed } from 'vue';
import { useError } from './error';
import { useAuth } from './auth';

const { authState } = useAuth();
const { setTopError } = useError();

// State attributes START.
const audio: Ref<object | null> = ref(null);
const currentItem: Ref<object | null> = ref({});
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

  const setAudioSrc = (src: string) => {
    if (!isAudio()) {
      audio.value = new Audio(src);
    } else if (audio.value.src !== src) {
      audio.value.setAttribute('src', src); //change the source
      audio.value.load(); //load the new source
    }
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

  const getAudioDuration = () => {
    if (isAudio()) {
      return audio.value.duration;
    }
    return 0;
  };
  // Methods END.

  return {
    audioPlayerState: readonly({
      audio: audio,
      currentItem: currentItem,
      isPlaying: isPlaying,
    }),
    isCurrentItem,
    setAudioSrc,
    startAudio,
    playAudio,
    togglePlayPause,
  };
};

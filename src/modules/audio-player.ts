import { ref, readonly, Ref } from 'vue';
import { AudioFile } from '../classes/file-manager/audioFile';

// State attributes START.
const audio: Ref<HTMLAudioElement> = ref(new Audio());

const currentAudioItem: Ref<AudioFile> = ref(new AudioFile());
audio.value.addEventListener('timeupdate', () => {
  currentAudioItem.value.currentTime = audio.value.currentTime;
});
audio.value.addEventListener('loadedmetadata', () => {
  currentAudioItem.value.duration = audio.value.duration;
});

const isPlaying: Ref<boolean> = ref(false);
// State attributes END.

export const useAudioPlayer = () => {
  // Methods START.
  const startAudio = (file: AudioFile) => {
    currentAudioItem.value = file;

    const src = file.file;
    if (audio.value.src !== src) {
      audio.value.setAttribute('src', src); // Change the source.
      audio.value.load(); // Load the new source.
    }

    playAudio();
  };

  const playAudio = () => {
    audio.value.play();
    isPlaying.value = true;
  };

  const pauseAudio = () => {
    audio.value.pause();
    isPlaying.value = false;
  };

  const togglePlayPause = () => {
    if (isPlaying.value) {
      pauseAudio();
    } else {
      playAudio();
    }
  };
  // Methods END.

  return {
    audioPlayerState: readonly({
      audio: audio,
      currentAudioItem: currentAudioItem,
      isPlaying: isPlaying,
    }),
    startAudio,
    playAudio,
    pauseAudio,
    togglePlayPause,
  };
};

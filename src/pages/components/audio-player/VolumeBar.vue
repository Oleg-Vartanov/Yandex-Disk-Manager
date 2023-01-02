<script setup lang="ts">
import { useAudioPlayer } from '../../../modules/audio-player';
import { ref, Ref, computed } from 'vue';

const { audioPlayerState, setVolumeByPercentage } = useAudioPlayer();

const volumePercentage: Ref<number> = ref(audioPlayerState.audio.volume * 100);
const volumePercentageBeforeMuting: Ref<number> = ref(volumePercentage.value);

const mouseDown = (event: MouseEvent) => {
  setVolumeOnMouseEvent(event);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

const mouseMove = (event: MouseEvent) => {
  setVolumeOnMouseEvent(event);
};

const mouseUp = (event: MouseEvent) => {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);
};

const setVolumeOnMouseEvent = (event: MouseEvent) => {
  const element = document.getElementById('volume-bar');
  if (element !== null) {
    const rect = element.getBoundingClientRect();
    let percentage = ((event.clientX - rect.left) / rect.width) * 100;

    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage > 100) {
      percentage = 100;
    }

    volumePercentage.value = percentage;
    setVolumeByPercentage(volumePercentage.value);
  }
};

const volumeIcon = computed(() => {
  if (volumePercentage.value === 0) {
    return 'src/assets/icons/bootstrap/light/volume-mute.svg';
  } else if (volumePercentage.value < 50) {
    return 'src/assets/icons/bootstrap/light/volume-down.svg';
  }
  return 'src/assets/icons/bootstrap/light/volume-up.svg';
});

const volumeIconClick = () => {
  if (volumePercentage.value !== 0) {
    volumePercentageBeforeMuting.value = volumePercentage.value;
    volumePercentage.value = 0;
  } else {
    volumePercentage.value = volumePercentageBeforeMuting.value;
  }
  setVolumeByPercentage(volumePercentage.value);
};
</script>

<template>
  <div class="row">
    <div class="col-md-auto">
      <img
        type="button"
        height="25"
        :src="volumeIcon"
        alt="PauseCircle"
        @click="volumeIconClick()"
      />
    </div>
    <div class="col">
      <div id="volume-bar" class="progress mt-1" @mousedown="mouseDown">
        <div
          class="progress-bar progress-bar-striped bg-warning"
          :class="audioPlayerState.isPlaying ? 'progress-bar-animated' : ''"
          role="progressbar"
          aria-label="Animated striped example"
          :style="'width:' + volumePercentage + '%'"
        ></div>
      </div>
    </div>
  </div>
</template>

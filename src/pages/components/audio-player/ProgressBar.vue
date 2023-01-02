<script setup lang="ts">
import { useAudioPlayer } from '../../../modules/audio-player';
import { computed, ref, Ref } from 'vue';

const { audioPlayerState, setCurrentTimeByPercentage } = useAudioPlayer();

const isSeeking: Ref<boolean> = ref(false);

const seekingPercentage = ref(0);
const audioPercentage = computed(() => {
  return (
    (audioPlayerState.currentAudioItem.currentTime /
      audioPlayerState.currentAudioItem.duration) *
    100
  );
});
const actualBarPercentage = computed(() => {
  return isSeeking.value ? seekingPercentage.value : audioPercentage.value;
});

const mouseDown = (event: MouseEvent) => {
  isSeeking.value = true;
  setSeekingPercentageOnMouseEvent(event);
  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
};

const mouseMove = (event: MouseEvent) => {
  setSeekingPercentageOnMouseEvent(event);
};

const mouseUp = (event: MouseEvent) => {
  document.removeEventListener('mousemove', mouseMove);
  document.removeEventListener('mouseup', mouseUp);
  setCurrentTimeByPercentage(seekingPercentage.value);
  isSeeking.value = false;
};

const setSeekingPercentageOnMouseEvent = (event: MouseEvent) => {
  const element = document.getElementById('progress-bar');
  if (element !== null) {
    const rect = element.getBoundingClientRect();
    let percentage = ((event.clientX - rect.left) / rect.width) * 100;

    if (percentage < 0) {
      percentage = 0;
    }
    if (percentage > 100) {
      percentage = 100;
    }

    seekingPercentage.value = percentage;
  }
};
</script>

<template>
  <div class="row">
    <div class="col">
      <div id="progress-bar" class="progress mt-1" @mousedown="mouseDown">
        <div
          class="progress-bar progress-bar-striped bg-warning"
          :class="audioPlayerState.isPlaying ? 'progress-bar-animated' : ''"
          role="progressbar"
          aria-label="Animated striped example"
          :style="'width:' + actualBarPercentage + '%'"
        ></div>
      </div>
    </div>
    <div class="col-md-auto">
      {{ audioPlayerState.currentAudioItem.getFormattedCurrentTime() }} /
      {{ audioPlayerState.currentAudioItem.getFormattedDuration() }}
    </div>
  </div>
</template>

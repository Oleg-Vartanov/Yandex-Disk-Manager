<script setup lang="ts">
import { useAudioPlayer } from '../../../modules/audio-player';
import ProgressBar from './ProgressBar.vue';

const { audioPlayerState, togglePlayPause } = useAudioPlayer();
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom text-light"
  >
    <div class="container-fluid row text-center">
      <div class="col">
        {{ audioPlayerState.currentAudioItem.name }}
      </div>
      <div class="col test">
        <ProgressBar />
      </div>
      <div class="col">
        <img
          class="player-button"
          type="button"
          height="30"
          src="src/assets/icons/bootstrap/light/skip-backward.svg"
          alt="PauseCircle"
        />
        <img
          class="player-button"
          type="button"
          height="30"
          :src="[
            audioPlayerState.isPlaying
              ? 'src/assets/icons/bootstrap/light/pause.svg'
              : 'src/assets/icons/bootstrap/light/play.svg',
          ]"
          alt="PausePlayCircle"
          @click="togglePlayPause()"
        />
        <img
          class="player-button"
          type="button"
          height="30"
          src="src/assets/icons/bootstrap/light/skip-forward.svg"
          alt="PauseCircle"
        />
        <img
          class="player-button"
          type="button"
          height="30"
          src="src/assets/icons/bootstrap/light/shuffle.svg"
          alt="PauseCircle"
        />
      </div>
    </div>
  </nav>
</template>

<style>
.player-button {
  margin-left: 10px;
  margin-right: 10px;
}

.test {
  display: inline-block;
}
</style>

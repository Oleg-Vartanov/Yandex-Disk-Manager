<script setup>
import { useAuth } from '../../modules/auth';
import { useFileManager } from '../../modules/file-manager';
import { useAudioPlayer } from '../../modules/audio-player';

const { logout } = useAuth();
const { fileManagerState } = useFileManager();
const {
  audioPlayerState,
  startAudio,
  togglePlayPause,
  isCurrentItem,
  isAudioType,
} = useAudioPlayer();
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom text-light"
  >
    <div class="container-fluid row text-center">
      <div class="col">
        {{ audioPlayerState.currentItem.name }}
      </div>
      <div class="col">
        <div class="progress">
          <div
            class="progress-bar progress-bar-striped bg-warning"
            :class="audioPlayerState.isPlaying ? 'progress-bar-animated' : ''"
            role="progressbar"
            aria-label="Animated striped example"
            :aria-valuenow="audioPlayerState.currentItemPlaybackTime"
            aria-valuemin="0"
            :aria-valuemax="audioPlayerState.currentItemDuration"
            :style="
              'width:' +
              (audioPlayerState.currentItemPlaybackTime /
                audioPlayerState.currentItemDuration) *
                100 +
              '%'
            "
          ></div>
        </div>
      </div>
      <div class="col">
        <img
          class="player-button"
          type="button"
          height="30"
          src="src/assets/icons/bootstrap/light/skip-backward.svg"
          alt="pause-circle"
        />
        <img
          class="player-button"
          type="button"
          height="30"
          :src="[
            audioPlayerState.isPlaying &&
            isCurrentItem(audioPlayerState.currentItem)
              ? 'src/assets/icons/bootstrap/light/pause.svg'
              : 'src/assets/icons/bootstrap/light/play.svg',
          ]"
          alt="pause-play-circle"
          @click="togglePlayPause()"
        />
        <img
          class="player-button"
          type="button"
          height="30"
          src="src/assets/icons/bootstrap/light/skip-forward.svg"
          alt="pause-circle"
        />
        <img
          class="player-button"
          type="button"
          height="30"
          src="src/assets/icons/bootstrap/light/shuffle.svg"
          alt="pause-circle"
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
</style>

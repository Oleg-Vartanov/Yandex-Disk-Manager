<script setup lang="ts">
import { ref, readonly, Ref, computed } from 'vue';
import { useAuth } from '../modules/auth';
import { useFileManager } from '../modules/file-manager';
import { useAudioPlayer } from '../modules/audio-player';
import { useError } from '../modules/error';

const { setTopError } = useError();
const { authState } = useAuth();
const { fileManagerState, navigate } = useFileManager();
const {
  audioPlayerState,
  startAudio,
  togglePlayPause,
  isCurrentItem,
  isAudioType,
} = useAudioPlayer();

navigate();

// const rowClick
</script>

<template>
  <div class="container-md align-content-center">
    <h1>Main Page</h1>
    <h3>
      Name: "{{ fileManagerState.currentDir.name }}"; Path: "{{
        fileManagerState.currentDir.path
      }}"; Type: "{{ fileManagerState.currentDir.type }}";
    </h3>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Name</th>
          <th scope="col">Path</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in fileManagerState.currentDir._embedded.items"
          :key="item.resource_id"
          class="fm-table-row"
          @click="[isCurrentItem(item) ? togglePlayPause() : startAudio(item)]"
        >
          <th scope="row">{{ item.type }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.path }}</td>
          <td>
            <img
              v-if="isAudioType(item)"
              height="30"
              :src="[
                audioPlayerState.isPlaying && isCurrentItem(item)
                  ? 'src/assets/icons/bootstrap/dark/pause-circle.svg'
                  : 'src/assets/icons/bootstrap/dark/play-circle.svg',
              ]"
              alt="pause-play-circle"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.fm-table-row {
  cursor: pointer;
}
</style>

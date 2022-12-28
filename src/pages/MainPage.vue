<script setup lang="ts">
import { ref, readonly, Ref, computed } from 'vue';
import { useAuth } from '../modules/auth';
import { useFileManager } from '../modules/file-manager';
import { useAudioPlayer } from '../modules/audio-player';
import { useError } from '../modules/error';

const { setTopError } = useError();
const { authState } = useAuth();
const { fileManagerState, navigate } = useFileManager();
const { audioPlayerState, startAudio, togglePlayPause, isCurrentItem } =
  useAudioPlayer();
navigate();
</script>

<template>
  <div class="container-md align-content-center text-center">
    <h1>Main Page</h1>
    <h3>
      Name: "{{ fileManagerState.currentDir.name }}"; Path: "{{
        fileManagerState.currentDir.path
      }}"; Type: "{{ fileManagerState.currentDir.type }}";
    </h3>
    <table class="table">
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
        >
          <th scope="row">{{ item.type }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.path }}</td>
          <td>
            <img
              v-if="item.media_type === 'audio'"
              height="30"
              :src="[
                audioPlayerState.isPlaying && isCurrentItem(item)
                  ? 'src/assets/images/pause-circle.svg'
                  : 'src/assets/images/play-circle.svg',
              ]"
              alt="pause-play-circle"
              type="button"
              @click="
                [isCurrentItem(item) ? togglePlayPause() : startAudio(item)]
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

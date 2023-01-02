<script setup lang="ts">
import { useFileManager } from '../modules/file-manager';
import { useAudioPlayer } from '../modules/audio-player';
import { File } from '../classes/file-manager/file';
import { AudioFile } from '../classes/file-manager/audioFile';
import { Folder } from '../classes/file-manager/folder';
import { FileManagerEnum } from '../enum/file-manager-enum';
import FolderBreadcrumb from './components/FolderBreadcrumb.vue';

const { fileManagerState, setCurrentDir, navigateDirUp } = useFileManager();
const { audioPlayerState, startAudio, togglePlayPause } = useAudioPlayer();

setCurrentDir();

const rowClick = (item: Folder | File | AudioFile) => {
  switch (item.constructor.name) {
    case Folder.name:
      setCurrentDir(item.path);
      break;

    case File.name:
      console.log(File.name);
      break;

    case AudioFile.name:
      if (audioPlayerState.currentAudioItem.hasResourceId(item.resourceId)) {
        togglePlayPause();
      } else {
        startAudio(item);
      }
      break;
  }
};
</script>

<template>
  <div class="container-md align-content-center">
    <h1 class="d-flex justify-content-center">Main Page</h1>
    <FolderBreadcrumb></FolderBreadcrumb>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Path</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-if="fileManagerState.currentDir.path !== FileManagerEnum.ROOT_PATH"
          class="fm-table-row"
          @click="navigateDirUp()"
        >
          <th>
            <img
              src="src/assets/icons/bootstrap/dark/arrow-return-left.svg"
              alt="Return"
            />
          </th>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <template
          v-for="item in fileManagerState.currentDir.embedded.items"
          :key="item.resourceId"
        >
          <tr
            v-if="
              item.constructor.name === Folder.name ||
              item.constructor.name === AudioFile.name
            "
            class="fm-table-row"
            @click="rowClick(item)"
          >
            <th>
              <img
                v-if="item.constructor.name === AudioFile.name"
                src="src/assets/icons/bootstrap/dark/file-earmark-music.svg"
                height="30"
                alt="AudioFile"
              />
              <img
                v-if="item.constructor.name === Folder.name"
                src="src/assets/icons/bootstrap/dark/folder.svg"
                height="30"
                alt="Folder"
              />
              <img
                v-if="item.constructor.name === File.name"
                src="src/assets/icons/bootstrap/dark/file-earmark-x.svg"
                height="30"
                alt="File"
              />
            </th>
            <td>{{ item.name }}</td>
            <td>{{ item.path }}</td>
            <td>
              <img
                v-if="item.constructor.name === AudioFile.name"
                height="30"
                :src="[
                  audioPlayerState.isPlaying &&
                  audioPlayerState.currentAudioItem.hasResourceId(
                    item.resourceId
                  )
                    ? 'src/assets/icons/bootstrap/dark/pause-circle.svg'
                    : 'src/assets/icons/bootstrap/dark/play-circle.svg',
                ]"
                alt="PausePlayCircle"
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
.fm-table-row {
  cursor: pointer;
}
</style>

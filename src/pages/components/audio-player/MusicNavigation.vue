<script setup lang="ts">
import { useFileManager } from '../../../modules/file-manager';
import { useAudioPlayer } from '../../../modules/audio-player';
import { File } from '../../../classes/file-manager/file';
import { AudioFile } from '../../../classes/file-manager/audioFile';
import { Folder } from '../../../classes/file-manager/folder';
import { FileManagerEnum } from '../../../enum/file-manager-enum';
import FolderBreadcrumb from '../FolderBreadcrumb.vue';
import Formatter from '../../../services/formatter';

const { fileManagerState, setCurrentDir, navigateDirUp } = useFileManager();
const { audioPlayerState, startAudio, togglePlayPause } = useAudioPlayer();

setCurrentDir();

const rowClick = (item: Folder | File | AudioFile) => {
  switch (item.constructor.name) {
    case Folder.name:
      setCurrentDir(item.path);
      break;

    case File.name:
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

const itemPlayIcon = (itemResourceId: string) => {
  if (
    audioPlayerState.isPlaying &&
    audioPlayerState.currentAudioItem.hasResourceId(itemResourceId)
  ) {
    return new URL(
      '/src/assets/icons/bootstrap/dark/pause-circle.svg',
      import.meta.url
    ).href;
  }
  return new URL(
    '/src/assets/icons/bootstrap/dark/play-circle.svg',
    import.meta.url
  ).href;
};
</script>

<template>
  <h1 class="d-flex justify-content-center">Disk Music</h1>
  <FolderBreadcrumb />
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Name</th>
        <th scope="col">Size</th>
        <th scope="col">Uploaded</th>
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
            src="/src/assets/icons/bootstrap/dark/arrow-return-left.svg"
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
              height="30"
              :src="itemPlayIcon(item.resourceId)"
              alt="PausePlayCircle"
            />
            <img
              v-if="item.constructor.name === Folder.name"
              src="/src/assets/icons/bootstrap/dark/folder.svg"
              height="30"
              alt="Folder"
            />
            <img
              v-if="item.constructor.name === File.name"
              src="/src/assets/icons/bootstrap/dark/file-earmark-x.svg"
              height="30"
              alt="File"
            />
          </th>
          <td>{{ item.name }}</td>
          <td>
            <div v-if="item.constructor.name === AudioFile.name">
              {{ Formatter.formatBytes(item.size) }}
            </div>
          </td>
          <td>{{ Formatter.formatDate(new Date(item.created)) }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style>
.fm-table-row {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { useFileManager } from '../../modules/file-manager';
import { computed } from 'vue';

const { fileManagerState, setCurrentDir } = useFileManager();

const breadcrumbs = computed(() => {
  return fileManagerState.currentDir.path.split('/');
});

const navigateDirByBreadcrumbsIndex = (index: number) => {
  let newPath: string[] | string = breadcrumbs.value.slice(0, index + 1);
  newPath = newPath.join('/');
  setCurrentDir(newPath);
};
</script>

<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="index">
        <li
          class="breadcrumb-item"
          :class="index === breadcrumbs.length - 1 ? 'active' : ''"
        >
          <a v-if="index === 0" href="#" @click.prevent="setCurrentDir()"
            >Root</a
          >
          <a v-else-if="index === breadcrumbs.length - 1">{{ breadcrumb }}</a>
          <a
            v-else
            href="#"
            @click.prevent="navigateDirByBreadcrumbsIndex(index)"
          >
            {{ breadcrumb }}
          </a>
        </li>
      </template>
    </ol>
  </nav>
</template>

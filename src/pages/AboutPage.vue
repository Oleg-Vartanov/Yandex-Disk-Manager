<script setup>
import { useFileManager } from '../modules/file-manager';

const { fileManagerState } = useFileManager();
</script>

<template>
  <div>Total space: {{ fileManagerState.diskInfo.total_space }}</div>
  <div>Used space: {{ fileManagerState.diskInfo.used_space }}</div>
  <div>
    Free space:
    {{
      fileManagerState.diskInfo.total_space -
      fileManagerState.diskInfo.used_space
    }}
  </div>
</template>

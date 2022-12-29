<script setup>
import { useFileManager } from '../modules/file-manager';

const { fileManagerState } = useFileManager();
</script>

<template>
  <div>Total space: {{ fileManagerState.generalInfo.totalSpace }}</div>
  <div>Used space: {{ fileManagerState.generalInfo.usedSpace }}</div>
  <div>
    Free space:
    {{
      fileManagerState.generalInfo.totalSpace -
      fileManagerState.generalInfo.usedSpace
    }}
  </div>
</template>

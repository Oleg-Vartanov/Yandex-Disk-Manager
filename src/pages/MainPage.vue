<script setup lang="ts">
import { useAuth } from '../modules/auth';
import { useFileManager } from '../modules/file-manager';
import API from '../services/api';
import { useError } from '../modules/error';

const { setTopError } = useError();
const { authState } = useAuth();
const { fileManagerState, navigate } = useFileManager();

// navigate();
</script>

<template>
  <h1>Main Page</h1>
</template>

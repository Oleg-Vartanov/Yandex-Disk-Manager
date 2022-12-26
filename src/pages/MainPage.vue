<script setup lang="ts">
import { useAuth } from '../modules/auth';
import { useFileManager } from '../modules/file-manager';
import API from '../services/api';
import { useError } from '../modules/error';

const { setTopError } = useError();
const { authState } = useAuth();
const { fileManagerState } = useFileManager();

API.getRecourse(authState.oAuthToken.access_token, 'disk:/').then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
    setTopError({ isError: true });
  }
);
</script>

<template>
  <h1>Main Page</h1>
  <h1>Hello {{ fileManagerState.user.display_name }}!</h1>
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

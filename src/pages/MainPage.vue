<script setup lang="ts">
import { useAuth } from '../modules/auth';

const { authState } = useAuth();
</script>

<template>
  <h1>Main Page</h1>
  <h1>Hello {{ authState.user.display_name }}!</h1>
  <div>Total space: {{ authState.diskInfo.total_space }}</div>
  <div>Used space: {{ authState.diskInfo.used_space }}</div>
  <div>
    Free space:
    {{ authState.diskInfo.total_space - authState.diskInfo.used_space }}
  </div>
</template>

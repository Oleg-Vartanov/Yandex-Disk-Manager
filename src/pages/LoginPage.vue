<script setup lang="ts">
import { useAuth } from '../modules/auth';

const { login } = useAuth();
</script>

<template>
  <img src="/src/assets/icons/dark/yandex-logo.svg" alt="yandex_logo" />
  <button type="button" class="btn btn-warning btn-lg" @click="login">
    Sign In
  </button>
</template>

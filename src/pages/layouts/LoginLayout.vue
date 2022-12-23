<script setup lang="ts">
document.body.className = 'body-login';

import TopError from '../components/TopError.vue';
</script>

<template>
  <div class="container">
    <div
      class="row justify-content-center align-items-center"
      style="height: 100vh"
    >
      <div class="card col-2 align-items-center p-3">
        <TopError></TopError>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

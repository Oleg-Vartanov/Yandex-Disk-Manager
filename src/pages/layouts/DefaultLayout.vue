<script setup lang="ts">
document.body.className = 'body-default';

import NavBar from '../components/NavBar.vue';
import TopError from '../components/TopError.vue';
</script>

<template>
  <NavBar></NavBar>
  <TopError></TopError>
  <router-view></router-view>
</template>

<style>
body {
  background-color: #d9d8d8;
}
</style>

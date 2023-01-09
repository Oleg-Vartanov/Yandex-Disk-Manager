<script setup lang="ts">
document.body.className = 'body-default';

import NavBar from '../components/NavBar.vue';
import TopError from '../components/TopError.vue';
import FooterAudioPlayer from '../components/audio-player/FooterAudioPlayer.vue';
import { useFileManager } from '../../modules/file-manager';
import { useAuth } from '../../modules/auth'; // Init import.

const { setGeneralInfo } = useFileManager();
setGeneralInfo();
</script>

<template>
  <NavBar></NavBar>
  <div class="main-container">
    <TopError></TopError>
    <router-view></router-view>
  </div>
  <FooterAudioPlayer></FooterAudioPlayer>
</template>

<style>
body {
  background-color: #d9d8d8;
}

.main-container {
  margin: 80px 10px 132px;
}
</style>

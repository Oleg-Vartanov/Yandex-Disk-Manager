<script setup>
import { useAuth } from '../modules/auth';
import { useFileManager } from '../modules/file-manager';
import { router } from '../router';
import Api from '../services/api';
import { useError } from '../modules/error';

const { loginCallback } = useAuth();

const params = new URLSearchParams(window.location.search);
const oAuthCode = params.get('code');
loginCallback(oAuthCode);
</script>

<template>
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../modules/auth';
import { useError } from '../modules/error';

const { errorState } = useError();
const { loginCallback } = useAuth();

const params = new URLSearchParams(window.location.search);
const oAuthCode = params.get('code');
if (oAuthCode !== null) {
  loginCallback(oAuthCode);
} else {
  errorState.topError.show();
}
</script>

<template>
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

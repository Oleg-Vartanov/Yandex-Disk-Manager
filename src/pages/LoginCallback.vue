<script setup>
import { useAuth } from '../modules/auth';
import { router } from '../router';
import Api from '../services/api';
import { useError } from '../modules/error';

const { setTopError } = useError();
const { setOAuthCode, setOAuthToken, setDiskInfo } = useAuth();

const params = new URLSearchParams(window.location.search);
const oAuthCode = params.get('code');

setOAuthCode(oAuthCode);

Api.getOAuthToken(oAuthCode).then(
  (response) => {
    setOAuthToken({
      access_token: response.data.access_token,
      expires_at: Number(response.data.expires_in) + Date.now(),
      refresh_token: response.data.refresh_token,
      token_type: response.data.token_type,
    });

    setDiskInfo();

    router.push({ name: 'main' });
  },
  (error) => {
    setTopError({ isError: true });
    console.log(error);
  }
);
</script>

<template>
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<script setup>
import { useAuth } from '../modules/auth';
import { useFileManager } from '../modules/file-manager';
import { router } from '../router';
import Api from '../services/api';
import { useError } from '../modules/error';

const { errorState } = useError();
const { setOAuthCode, setOAuthToken } = useAuth();
const { setGeneralInfo } = useFileManager();

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

    setGeneralInfo();

    router.push({ name: 'main' });
  },
  (error) => {
    errorState.topError.show();
    console.log(error);
  }
);
</script>

<template>
  <div class="spinner-border text-warning" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

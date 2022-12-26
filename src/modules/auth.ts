import { router } from '../router';
import { computed, ref, reactive, readonly, ComputedRef } from 'vue';
import { AuthModule, oAuthToken } from '../interfaces/auth-interfaces';

// State attributes START.
const oAuthCode = ref('');

const oAuthToken: oAuthToken = reactive({
  access_token: '',
  expires_at: '',
  refresh_token: '',
  token_type: '',
});

const isLoggedIn: ComputedRef<boolean> = computed(() => {
  return oAuthToken.access_token !== '';
});
// State attributes END.

export const useAuth: () => AuthModule = () => {
  // Methods START.
  const setOAuthCode = (newCode: string) => {
    oAuthCode.value = newCode;
  };

  const setOAuthToken = (newOAuthToken: object) => {
    oAuthToken.access_token = newOAuthToken.access_token;
    oAuthToken.expires_at = newOAuthToken.expires_at;
    oAuthToken.refresh_token = newOAuthToken.refresh_token;
    oAuthToken.token_type = newOAuthToken.token_type;
  };

  const login = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_YANDEX_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_YANDEX_REDIRECT_URL,
    });

    // Gets OAuth code in a login callback.
    window.location.href =
      'https://oauth.yandex.com/authorize?' + params.toString();
  };

  const logout = () => {
    oAuthToken.access_token = '';
    oAuthToken.expires_at = '';
    oAuthToken.refresh_token = '';
    oAuthToken.token_type = '';
    router.push({ name: 'login' });
  };
  // Methods END.

  return {
    authState: readonly({
      oAuthToken: oAuthToken,
      isLoggedIn: isLoggedIn,
    }),
    setOAuthCode,
    setOAuthToken,
    login,
    logout,
  };
};

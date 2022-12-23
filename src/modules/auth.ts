import { router } from '../router';
import { computed, reactive, readonly, ref } from 'vue';

const clientID = import.meta.env.VITE_YANDEX_CLIENT_ID;
const clientSecret = import.meta.env.VITE_YANDEX_CLIENT_SECRET;
const redirectURL = import.meta.env.VITE_YANDEX_REDIRECT_URL;

const oAuthCode = ref('');
const oAuthToken = reactive({
  access_token: '',
  expires_at: '',
  refresh_token: '',
  token_type: '',
});
const isLoggedIn = computed(() => {
  return oAuthToken.access_token !== '';
});

interface AuthModule {
  authState: Readonly<{
    authState: Readonly<{
      oAuthToken: {
        access_token: string;
        refresh_token: string;
        expires_at: string;
        token_type: string;
      };
    }>;
    isLoggedIn: Readonly<boolean>;
  }>;
  setOAuthCode: (newCode: string) => void;
  setOAuthToken: (newOAuthToken: object) => void;
  login: () => Promise<unknown>;
  logout: () => void;
}

export const useAuth: () => AuthModule = () => {
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
      client_id: clientID,
      redirect_uri: redirectURL,
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

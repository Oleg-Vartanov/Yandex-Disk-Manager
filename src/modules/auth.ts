import { router } from '../router';
import { computed, ref, readonly, ComputedRef, Ref, UnwrapRef } from 'vue';
import { AuthModuleInterface } from '../interfaces/auth-interfaces';
import { OAuthToken } from '../classes/auth/oauth-token';
import Api from '../services/api';
import { useError } from './error';
import { YandexIDUser } from '../classes/auth/yandex-id-user';

const { errorState } = useError();

// State attributes START.
const oAuthCode: Ref<string> = ref('');

const oAuthToken: Ref<UnwrapRef<OAuthToken>> = ref(new OAuthToken());

const isLoggedIn: ComputedRef<boolean> = computed(() => {
  return oAuthToken.value.accessToken !== '';
});

const user: Ref<UnwrapRef<YandexIDUser>> = ref(new YandexIDUser());
// State attributes END.

export const useAuth: () => AuthModuleInterface = () => {
  // Methods START.
  const login = () => {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: import.meta.env.VITE_YANDEX_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_YANDEX_REDIRECT_URL,
      force_confirm: 'true',
    });

    // Gets OAuth code in a login callback.
    window.location.href =
      'https://oauth.yandex.com/authorize?' + params.toString();
  };

  const loginCallback = (newOAuthCode: string) => {
    oAuthCode.value = newOAuthCode;

    Api.getOAuthToken(oAuthCode.value)
      .then((response) => {
        oAuthToken.value.setPropsFromResponse(response.data);
        setUserInfo();
        router.push({ name: 'main' });
      })
      .catch((error) => {
        errorState.topError.show();
      });
  };

  const logout = () => {
    oAuthToken.value.reset();
    router.push({ name: 'login' });
  };

  const setUserInfo = () => {
    Api.getUserInfo(oAuthToken.value.accessToken)
      .then((response) => {
        user.value.setPropsFromResponse(response.data);
      })
      .catch((error) => {
        errorState.topError.show();
      });
  };
  // Methods END.

  return {
    authState: readonly({
      oAuthToken: oAuthToken,
      isLoggedIn: isLoggedIn,
      user: user,
    }),
    login,
    loginCallback,
    logout,
  };
};

import { router } from '../router';
import { computed, ref, reactive, readonly, Ref, ComputedRef } from 'vue';
import API from '../services/api';
import { AuthModule, User, DiskInfo, oAuthToken } from '../interfaces/auth';
import { useError } from './error';

const clientID = import.meta.env.VITE_YANDEX_CLIENT_ID;
const clientSecret = import.meta.env.VITE_YANDEX_CLIENT_SECRET;
const redirectURL = import.meta.env.VITE_YANDEX_REDIRECT_URL;

const { setTopError } = useError();

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

const user: Ref<User> = ref({
  country: '',
  display_name: '',
  login: '',
  uid: '',
});

const diskInfo: Ref<DiskInfo> = ref({
  is_paid: false,
  max_file_size: '',
  paid_max_file_size: '',
  revision: '',
  system_folders: {},
  total_space: '',
  trash_size: '',
  unlimited_autoupload_enabled: false,
  used_space: '',
  user: user.value,
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

  const setDiskInfo = () => {
    API.getDiskInfo(oAuthToken.access_token).then(
      (response) => {
        console.log(response.data);
        diskInfo.value = response.data;
        user.value = response.data.user;
      },
      (error) => {
        setTopError({ isError: true });
        console.log(error);
      }
    );
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
  // Methods END.

  return {
    authState: readonly({
      oAuthToken: oAuthToken,
      isLoggedIn: isLoggedIn,
      user: user,
      diskInfo: diskInfo,
    }),
    setOAuthCode,
    setOAuthToken,
    setDiskInfo,
    login,
    logout,
  };
};

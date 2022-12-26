import axios from 'axios';

const clientID = import.meta.env.VITE_YANDEX_CLIENT_ID;
const ClientSecret = import.meta.env.VITE_YANDEX_CLIENT_SECRET;
const redirectURL = import.meta.env.VITE_YANDEX_REDIRECT_URL;

const apiBaseUrl = 'https://cloud-api.yandex.net';
const apiVersion = 'v1';
const authType = 'OAuth';

export default {
  getOAuthToken(oAuthCode: string) {
    return axios.post(
      `https://oauth.yandex.com/token`,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: oAuthCode,
        client_id: clientID,
        client_secret: ClientSecret,
      })
    );
  },

  getDiskInfo(accessToken) {
    return axios.get(`${apiBaseUrl}/${apiVersion}/disk`, {
      headers: {
        Authorization: `${authType} ${accessToken}`,
      },
    });
  },
};

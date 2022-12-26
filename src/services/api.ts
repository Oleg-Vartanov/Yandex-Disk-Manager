import axios from 'axios';

const clientID = import.meta.env.VITE_YANDEX_CLIENT_ID;
const ClientSecret = import.meta.env.VITE_YANDEX_CLIENT_SECRET;

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

  getDiskInfo(accessToken: string) {
    return axios.get(`${apiBaseUrl}/${apiVersion}/disk`, {
      headers: {
        Authorization: `${authType} ${accessToken}`,
      },
    });
  },

  getRecourse(accessToken: string, path = '') {
    return axios.get(`${apiBaseUrl}/${apiVersion}/disk/resources`, {
      headers: {
        Authorization: `${authType} ${accessToken}`,
      },
      params: {
        path: path,
      },
    });
  },

  // https://yandex.com/dev/disk/api/reference/all-files.html
  getAllRecourses(accessToken: string, params: object = {}) {
    return axios.get(`${apiBaseUrl}/${apiVersion}/disk/resources/files`, {
      headers: {
        Authorization: `${authType} ${accessToken}`,
      },
      params,
    });
  },
};

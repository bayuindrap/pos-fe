import axios from 'axios';
import mainStore from '../redux/store/mainStore';
import { sessionAction } from '../redux/slicer/sessionSlicer';
import { useNavigate } from 'react-router-dom';


const API_URL =  'http://localhost:8080/';

// 'http://localhost:2053/';
// 203.194.112.183

export async function APIlogin(resource = '', params = {}) {
  const url = API_URL + resource;
  var customConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const v = await axios.post(url, params, customConfig);
    return v.data;
  } catch (err) {
    return console.log(['APIGet error:', err]);
  }
}

export async function APIGetStore(
  resource = '',
  params = {},
  responseType = 'json',
) {
  const url = API_URL + resource;
  const sessionData = mainStore.getState().session.data.accessToken;
  var customConfig = {
    headers: {
      'Content-Type': 'application/json',
      token: sessionData.accessToken,
    },
  };
  try {
    const v = await axios.post(url, params, customConfig);
    return v.data;
  } catch (err) {
    return err;
  }
}

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// instance.interceptors.request.use(
//   config => {
//     if (config.url != 'logins') {
//       const token = mainStore.getState().session.data.accessToken
//       const chid = mainStore.getState().session.data.CHANNEL_CD
//       config.headers['chid'] = chid
//       if (token) {
//         config.headers['token'] = token
//       }
//     }
//     return config
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig != undefined) {
      if (originalConfig.url !== 'logins' && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await instance.post('refreshToken', {
              refreshToken: mainStore.getState().session.data.refreshToken,
            });
            mainStore.dispatch(
              sessionAction.updateToken({
                accessToken: rs.data.data.token.accessToken,
              }),
            );
            originalConfig.headers.token =
              mainStore.getState().session.data.accessToken;
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 405) {
          mainStore.dispatch(sessionAction.logout());
          const navigate = useNavigate();
          navigate('/login');
        }
      }
    }

    return Promise.reject(err);
  },
);

export default instance;

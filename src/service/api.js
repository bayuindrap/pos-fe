import axios from 'axios';
import mainStore from '../redux/store/mainStore';
import { sessionAction } from '../redux/slicer/sessionSlicer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const API_URL =  'http://localhost:8080/';

// const sessionData = mainStore.getState().session;
// console.log("liat", sessionData.token)

const instance = axios.create({
  
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

// export async function APIlogin(resource = '', params = {}) {
//   const url = API_URL + resource;
//   var customConfig = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   try {
//     const v = await axios.post(url, params, customConfig);
//     return v.data;
//   } catch (err) {
//     return console.log(['APIGet error:', err]);
//   }
// }


export async function APIwithJWT(
  resource = '',
  params = {},
  responseType = 'json',
) {
  const url = API_URL + resource;
  const sessionData = useSelector((state) => state.session)
  console.log("cektoken", sessionData); // Lihat seluruh state session
  console.log("Token yang ada:", sessionData?.token); // Cek token
  var customConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionData?.token}`,
    },
  };
  try {
    const response = await instance.post(resource, params, customConfig);
    return response.data;
  } catch (err) {
    return err;
  }
}


instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    // Pindahkan logika untuk menangani 401 dan redirect ke komponen
    if (originalConfig) {
      if (err.response && err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post('refreshToken', {
            refreshToken: mainStore.getState().session.refreshToken,
          });

          mainStore.dispatch(
            sessionAction.updateToken({
              accessToken: rs.data.data.token.accessToken,
              refreshToken: rs.data.data.token.refreshToken,
            }),
          );

          originalConfig.headers['Authorization'] = `Bearer ${mainStore.getState().session.token}`;

          return instance(originalConfig); // Lanjutkan request dengan token yang baru
        } catch (_error) {
          // Redirect menggunakan callback atau dispatch logout
          return Promise.reject(_error);
        }
      }

      if (err.response.status === 405) {
        // Redirect dengan callback atau dispatch logout
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  },
);


export default instance;

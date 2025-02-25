// import axios from 'axios';
// import mainStore from '../redux/store/mainStore';
// import { sessionAction } from '../redux/slicer/sessionSlicer';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';


// const API_URL =  'http://localhost:8080/';


// const instance = axios.create({
  
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   },
// })





// export default instance;


import axios from 'axios';
import mainStore from '../redux/store/mainStore';
import { sessionAction } from '../redux/slicer/sessionSlicer';

const API_URL = 'http://localhost:8080/';


const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});


instance.interceptors.request.use(
  (config) => {
    const state = mainStore.getState();
    const token = state.session.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};


const navigateToLogin = () => {
  window.location.href = '/login';
};


instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
 
    if (!error.response || error.response.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

 
    originalRequest._retry = true;
    

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return instance(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
    
    isRefreshing = true;
    
    try {
      const state = mainStore.getState();
      const refreshToken = state.session.refreshToken;
      
      if (!refreshToken) {
        mainStore.dispatch(sessionAction.logout());
        navigateToLogin();
        throw new Error('Refresh token not available');
      }
      
      const response = await axios.post(`${API_URL}auth/refresh`, {
        refreshToken: refreshToken
      });
      
      if (response.data.status) {
        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;
        
        mainStore.dispatch(sessionAction.addSession({
          data: state.session.data,
          token: newToken,
          refreshToken: newRefreshToken
        }));
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        processQueue(null, newToken);
        
        return instance(originalRequest);
      } else {
        throw new Error(response.data.message || 'Failed to refresh token');
      }
    } catch (err) {
      mainStore.dispatch(sessionAction.logout());
      processQueue(err, null);
      
      navigateToLogin();
      
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default instance;

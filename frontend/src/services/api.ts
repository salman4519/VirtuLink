import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:7777/api', // change this to your backend
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true  
});
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.withCredentials = true;  
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;

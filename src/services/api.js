// src/services/api.js
import axios from 'axios';

const defaultBaseURL = 'https://alesteb-back.onrender.com/api';
const envBaseURL = import.meta.env.VITE_API_BASE_URL;
const apiBaseURL = envBaseURL && envBaseURL !== '/api' ? envBaseURL : defaultBaseURL;

const api = axios.create({
  baseURL: apiBaseURL,
});

// ESTO ES VITAL: Agrega el token a CADA petición automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // O como guardes tu token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.config) {
      console.error(
        'API request failed:',
        error.config.method?.toUpperCase(),
        error.config.url,
        error.response?.status,
        error.response?.data
      );
    }
    return Promise.reject(error);
  }
);

export default api;
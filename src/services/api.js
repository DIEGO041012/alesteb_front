// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://alesteb-back.onrender.com/api'
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
// src/api/axios.ts
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar token dinámico
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

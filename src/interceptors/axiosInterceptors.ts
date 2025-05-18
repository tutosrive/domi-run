import axios from 'axios';

// URLs not intercepted
const EXCLUDED_ROUTES = ['/login'];

const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(sessionStorage.getItem('user_domi_run') || '{}');
    // Verify if URL is excluded
    if (EXCLUDED_ROUTES.some((route) => config.url?.includes(route)) || !user) {
      return config;
    }
    // Add token URL is not excluded
    const token = user['token'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('Not authorized, ¡first login!...');
      window.location.href = '/login'; // Redirigir si la sesión expira
    }
    return Promise.reject(error);
  },
);

export default api;

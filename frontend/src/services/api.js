import axios from 'axios';

/**
 * Axios instance with base URL and interceptors.
 * 
 * In development: Vite proxy forwards /api/* to the backend.
 * In production (Docker): Nginx proxies /api/* to the backend.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle common error patterns
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized — redirect to login, clear token, etc.
      console.warn('Unauthorized — clearing auth token');
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

export default api;

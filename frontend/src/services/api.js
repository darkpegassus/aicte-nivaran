import axios from 'axios';

// Use 127.0.0.1 explicitly to avoid Windows IPv6 (::1) vs IPv4 resolution issues
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to inject official JWT bearer token
apiClient.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('aicte_oneview_user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        // ignore invalid json
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Session expired. Redirecting to login.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
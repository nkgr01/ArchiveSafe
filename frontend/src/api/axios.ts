import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Intercepteurs de requêtes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteurs de réponses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const config = error.config;
      switch (error.response.status) {
        case 401:
          // Non authentifié -> Redirection vers login
          if (!config?.url?.includes('/login') && !config?.url?.includes('/register')) {
             window.location.href = '/auth/login';
          }
          break;
        case 403:
          // Interdit -> Redirection vers unauthorized
          window.location.href = '/unauthorized';
          break;
        case 500:
          console.error('Erreur serveur interne');
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;


import apiClient from '@/api/axios';

const api = {
  get(url: string, params = {}) {
    return apiClient.get(url, { params });
  },
  post(url: string, data = {}) {
    return apiClient.post(url, data);
  },
  put(url: string, data = {}) {
    return apiClient.put(url, data);
  },
  delete(url: string) {
    return apiClient.delete(url);
  },
};

export default api;
export { api };


import axios from '@/api/axios';
import type { User } from '@/types/user';
import type { AuthResponse } from '@/types/auth';

export const AuthService = {
  async login(credentials: any): Promise<AuthResponse> {
    // Sanctum nécessite d'abord l'initialisation du cookie CSRF
    await axios.get('/sanctum/csrf-cookie');
    const { data } = await axios.post('/api/login', credentials);
    return data;
  },

  async register(userData: any): Promise<AuthResponse> {
    await axios.get('/sanctum/csrf-cookie');
    const { data } = await axios.post('/api/register', userData);
    return data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    await axios.get('/sanctum/csrf-cookie');
    const { data } = await axios.post('/api/forgot-password', { email });
    return data;
  },

  async getUser(): Promise<User> {
    const { data } = await axios.get('/api/me');
    return data;
  },

  async logout(): Promise<void> {
    await axios.post('/api/logout');
  }
};

import { defineStore } from 'pinia';
import { AuthService } from '@/api/services/auth.service';
import type { User } from '@/types/user';
import type { AuthResponse } from '@/types/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    token: localStorage.getItem('auth_token'),
    loading: false,
    initialized: false,
  }),
  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    async login(credentials: any) {
      this.loading = true;
      try {
        const response: AuthResponse = await AuthService.login(credentials);
        this.setAuth(response.user, response.access_token);
        return response;
      } finally {
        this.loading = false;
      }
    },
    async register(userData: any) {
      this.loading = true;
      try {
        const response: AuthResponse = await AuthService.register(userData);
        this.setAuth(response.user, response.access_token);
        return response;
      } finally {
        this.loading = false;
      }
    },
    async fetchUser() {
      if (this.initialized) {
        return;
      }

      if (!this.token) {
        this.isAuthenticated = false;
        this.initialized = true;
        return;
      }

      this.loading = true;
      try {
        const user = await AuthService.getUser();
        this.setUser(user);
      } catch (error) {
        await this.logout();
      } finally {
        this.loading = false;
        this.initialized = true;
      }
    },
    setInitialized(value: boolean) {
      this.initialized = value;
    },
    setAuth(user: User, token: string) {
      this.user = user;
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem('auth_token', token);
    },
    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
    async logout() {
      try {
        await AuthService.logout();
      } finally {
        this.user = null;
        this.isAuthenticated = false;
        this.token = null;
        localStorage.removeItem('auth_token');
      }
    },
  },
});

import { defineStore } from 'pinia';
import api from '@/services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

interface SystemStatus {
  status: string;
  php_version: string;
  laravel_version: string;
  environment: string;
  timestamp: string;
}

interface StorageInfo {
  disk_free_space: string;
  storage_path: string;
  status: 'ok' | 'warning';
}

interface RedisInfo {
  status: 'connected' | 'disconnected';
  version?: string;
  used_memory?: string;
  connected_clients?: number;
  error?: string;
}

interface QueueInfo {
  queue_name: string;
  pending_jobs: number;
  status: 'ok' | 'congested';
}

export const useAdminStore = defineStore('admin', {
  state: () => ({
    users: [] as User[],
    systemStatus: {} as SystemStatus,
    storageInfo: {} as StorageInfo,
    redisInfo: {} as RedisInfo,
    queueInfo: {} as QueueInfo,
    logs: '',
    settings: {
      app_name: '',
      timezone: '',
      debug_mode: false,
      maintenance_mode: false
    },
    isLoading: false,
  }),

  actions: {
    // Users
    async fetchUsers() {
      this.isLoading = true;
      try {
        const response = await api.get('/admin/users');
        this.users = response.data.users;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser(id: number, userData: Partial<User>) {
      try {
        await api.put(`/admin/users/${id}`, userData);
        await this.fetchUsers();
      } catch (error) {
        throw error;
      }
    },

    async deleteUser(id: number) {
      try {
        await api.delete(`/admin/users/${id}`);
        await this.fetchUsers();
      } catch (error) {
        throw error;
      }
    },

    // Monitoring
    async fetchSystemStatus() {
      try {
        const [status, storage, redis, queue] = await Promise.all([
          api.get('/admin/system/status'),
          api.get('/admin/system/storage'),
          api.get('/admin/system/redis'),
          api.get('/admin/system/queue'),
        ]);
        this.systemStatus = status.data;
        this.storageInfo = storage.data;
        this.redisInfo = redis.data;
        this.queueInfo = queue.data;
      } catch (error) {
        console.error('System monitoring failed:', error);
      }
    },

    async fetchLogs() {
      try {
        const response = await api.get('/admin/system/logs');
        this.logs = response.data.logs;
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    },

    async fetchSettings() {
      try {
        const response = await api.get('/admin/system/settings');
        this.settings = response.data;
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    },

    async updateSettings(settings: any) {
      try {
        await api.put('/admin/system/settings', settings);
        await this.fetchSettings();
      } catch (error) {
        throw error;
      }
    }
  }
});

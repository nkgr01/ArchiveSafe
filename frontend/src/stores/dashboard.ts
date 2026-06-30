import { defineStore } from 'pinia';
import axios from '@/api/axios';

export interface DashboardStats {
  total_documents: number;
  added_today: number;
  ocr_pending: number;
  ocr_completed: number;
  total_storage_bytes: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recent_activity: any[];
  distributions: {
    types: any[];
    tags: any[];
    correspondents: any[];
  };
  storage: {
    used_bytes: number;
    limit_bytes: number;
  };
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    data: null as DashboardData | null,
    loading: false,
    error: null as string | null,
    lastUpdated: null as number | null,
  }),
  actions: {
    async fetchDashboardData(force = false) {
      // Cache simple: 5 minutes
      if (!force && this.data && this.lastUpdated && (Date.now() - this.lastUpdated < 300000)) {
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get('/api/dashboard');
        this.data = data;
        this.lastUpdated = Date.now();
      } catch (err: any) {
        this.error = err.response?.data?.message || 'Erreur lors du chargement du tableau de bord';
        throw err;
      } finally {
        this.loading = false;
      }
    }
  }
});

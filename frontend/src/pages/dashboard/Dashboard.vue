<template>
  <div class="flex flex-column gap-6">
    <!-- Header Section -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Tableau de Bord</h1>
        <p class="text-surface-500">Bienvenue, {{ user.name || 'Utilisateur' }} ! Voici l'état de vos archives.</p>
      </div>
      <div class="flex gap-2">
        <Button label="Upload Rapide" icon="pi pi-upload" severity="primary" @click="goToUpload" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid">
      <div v-for="(stat, index) in statsConfig" :key="index" class="col-12 md:col-6 lg:col-3">
        <div v-if="dashboardStore.loading && !dashboardStore.data" class="p-4 bg-surface-0 dark:bg-surface-800 border-round-xl border-1 border-surface-200 dark:border-surface-700 flex flex-column gap-3">
          <Skeleton width="3rem" height="3rem" class="border-round" />
          <div class="flex flex-column gap-2">
            <Skeleton width="60%" height="1rem" />
            <Skeleton width="80%" height="2rem" />
          </div>
        </div>
        <DashboardStatCard 
          v-else
          :title="stat.title" 
          :value="formatValue(stat.key)" 
          :icon="stat.icon" 
          :color="stat.color" 
          :trend="formatTrend(stat.key)" 
        />
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid">
      <!-- Recent Activity -->
      <div class="col-12 lg:col-8">
        <Card>
          <template #title>
            <div class="flex justify-content-between align-items-center">
              <span class="text-xl font-bold">Activité Récente</span>
              <div class="flex gap-2">
                <Button icon="pi pi-refresh" text rounded size="small" @click="refreshData" :loading="dashboardStore.loading" />
                <Button label="Voir tout" icon="pi pi-external-link" text size="small" @click="goToDocs" />
              </div>
            </div>
          </template>
          <template #content>
            <div v-if="dashboardStore.loading && !dashboardStore.data" class="flex flex-column gap-3 py-4">
              <Skeleton width="100%" height="3rem" />
              <Skeleton width="100%" height="3rem" />
              <Skeleton width="100%" height="3rem" />
            </div>
            <DataTable v-else :value="recentDocs" responsiveLayout="stack" class="p-datatable-sm">
              <Column field="title" header="Nom du Document">
                <template #body="slotProps">
                  <div class="flex align-items-center gap-2">
                    <i class="pi pi-file text-surface-400" />
                    <span>{{ slotProps.data.title }}</span>
                  </div>
                </template>
              </Column>
              <Column field="created_at" header="Date" sortable>
                <template #body="slotProps">
                  {{ formatDate(slotProps.data.created_at) }}
                </template>
              </Column>
              <Column field="status" header="Statut">
                <template #body="slotProps">
                  <Tag :severity="getStatusSeverity(slotProps.data.status)" :value="slotProps.data.status" />
                </template>
              </Column>
              <Column header="Action" class="text-right">
                <template #body="slotProps">
                  <Button icon="pi pi-eye" text rounded @click="viewDoc(slotProps.data.id)" />
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>

      <!-- Quick Access & Shortcuts -->
      <div class="col-12 lg:col-4 flex flex-column gap-4">
        <Card>
          <template #title>
            <span class="text-xl font-bold">Raccourcis</span>
          </template>
          <template #content>
            <div class="flex flex-column gap-2">
              <Button label="Nouveau Dossier" icon="pi pi-folder-plus" severity="secondary" text class="w-full justify-content-start" @click="createFolder" />
              <Button label="Recherche Avancée" icon="pi pi-search-plus" severity="secondary" text class="w-full justify-content-start" @click="goToSearch" />
              <Button label="Paramètres OCR" icon="pi pi-cog" severity="secondary" text class="w-full justify-content-start" @click="goToSettings" />
            </div>
          </template>
        </Card>

        <Card>
          <template #title>
            <span class="text-xl font-bold">Aide IA</span>
          </template>
          <template #content>
            <div class="flex flex-column gap-3">
              <p class="text-sm text-surface-500">Posez une question sur l'ensemble de vos documents.</p>
              <div class="flex gap-2">
                <InputText placeholder="Que recherchez-vous ?" class="flex-1" />
                <Button icon="pi pi-send" severity="primary" @click="askAI" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useDashboardStore } from '@/stores/dashboard';
import Card from '@/components/ui/Card.vue';
import DataTable from '@/components/ui/DataTable.vue';
import Column from '@/components/ui/Column.vue';
import Button from '@/components/ui/Button.vue';
import Tag from '@/components/ui/Tag.vue';
import InputText from '@/components/ui/InputText.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import DashboardStatCard from '@/components/domain/dashboard/DashboardStatCard.vue';
import { useNotification } from '@/composables/useNotification';

const router = useRouter();
const authStore = useAuthStore();
const dashboardStore = useDashboardStore();
const notify = useNotification();

const user = computed(() => authStore.user || { name: 'Utilisateur' });

const statsConfig = [
  { title: 'Documents', key: 'total_documents', icon: 'pi pi-file', color: 'text-blue-500', trend: 'Total' },
  { title: 'Stockage Utilisé', key: 'total_storage_bytes', icon: 'pi pi-database', color: 'text-purple-500', trend: 'Capacité' },
  { title: 'En attente OCR', key: 'ocr_pending', icon: 'pi pi-cog', color: 'text-orange-500', trend: 'À traiter' },
  { title: 'OCR Terminés', key: 'ocr_completed', icon: 'pi pi-check-circle', color: 'text-green-500', trend: 'Validés' },
];

const recentDocs = computed(() => dashboardStore.data?.recent_activity || []);

function formatValue(key: string) {
  const val = (dashboardStore.data?.stats as any)?.[key];
  if (val === undefined) return '0';
  
  if (key === 'total_storage_bytes') {
    return formatBytes(val);
  }
  return val.toLocaleString();
}

function formatTrend(key: string) {
  const stats = dashboardStore.data?.stats;
  if (!stats) return '';
  
  switch (key) {
    case 'total_documents': return `+${stats.added_today} aujourd'hui`;
    case 'total_storage_bytes': 
      const used = stats.total_storage_bytes;
      const limit = dashboardStore.data?.storage.limit_bytes || 5368709120;
      const percent = Math.round((used / limit) * 100);
      return `${percent}% de la limite`;
    case 'ocr_pending': return 'Traitement en cours';
    case 'ocr_completed': return 'Archive sécurisée';
    default: return '';
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR');
}

function getStatusSeverity(status: string) {
  switch (status) {
    case 'completed': return 'success';
    case 'pending': return 'warning';
    case 'error': return 'danger';
    default: return 'info';
  }
}

async function refreshData() {
  try {
    await dashboardStore.fetchDashboardData(true);
  } catch (err) {
    notify.error('Erreur Dashboard', 'Impossible de rafraîchir les données.');
  }
}

function goToUpload() { router.push('/upload'); }
function goToDocs() { router.push('/documents'); }
function viewDoc(id: number) { router.push(`/documents/${id}`); }
function createFolder() { /* Logic */ }
function goToSearch() { router.push('/documents'); }
function goToSettings() { router.push('/admin/settings'); }
function askAI() { router.push('/ai/explore'); }

onMounted(() => {
  dashboardStore.fetchDashboardData();
});
</script>

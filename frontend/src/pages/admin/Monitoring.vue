<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Monitoring Système</h1>
        <p class="text-surface-500">État de santé du serveur et des files d'attente de traitement</p>
      </div>
      <Button label="Rafraîchir" icon="pi pi-refresh" severity="secondary" @click="refreshStats" />
    </div>

    <div class="grid">
      <!-- Server Health -->
      <div class="col-12 md:col-6 lg:col-3">
        <Card class="text-center">
          <template #content>
            <div class="flex flex-column align-items-center gap-2">
              <span class="text-surface-500 text-sm">Environnement</span>
              <div class="text-3xl font-bold text-blue-500">{{ adminStore.systemStatus.environment || '...' }}</div>
              <div class="text-xs text-surface-400">{{ adminStore.systemStatus.php_version }} | {{ adminStore.systemStatus.laravel_version }}</div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <Card class="text-center">
          <template #content>
            <div class="flex flex-column align-items-center gap-2">
              <span class="text-surface-500 text-sm">Statut API</span>
              <div class="text-3xl font-bold" :class="adminStore.systemStatus.status === 'healthy' ? 'text-green-500' : 'text-red-500'">
                {{ adminStore.systemStatus.status === 'healthy' ? 'Online' : 'Offline' }}
              </div>
              <div class="text-xs text-surface-400">Dernière vérification : {{ adminStore.systemStatus.timestamp }}</div>
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <Card class="text-center">
          <template #content>
            <div class="flex flex-column align-items-center gap-2">
              <span class="text-surface-500 text-sm">Espace Libre</span>
              <div class="text-3xl font-bold text-orange-500">{{ adminStore.storageInfo.disk_free_space || '...' }}</div>
              <Tag :severity="adminStore.storageInfo.status === 'ok' ? 'success' : 'danger'" :value="adminStore.storageInfo.status === 'ok' ? 'Sain' : 'Critique'" />
            </div>
          </template>
        </Card>
      </div>
      <div class="col-12 md:col-6 lg:col-3">
        <Card class="text-center">
          <template #content>
            <div class="flex flex-column align-items-center gap-2">
              <span class="text-surface-500 text-sm">Redis Status</span>
              <div class="text-3xl font-bold" :class="adminStore.redisInfo.status === 'connected' ? 'text-green-500' : 'text-red-500'">
                {{ adminStore.redisInfo.status === 'connected' ? 'Connecté' : 'Déconnecté' }}
              </div>
              <div class="text-xs text-surface-400">Mémoire : {{ adminStore.redisInfo.used_memory || '...' }}</div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Redis Queue Monitoring -->
      <div class="col-12">
        <Card>
          <template #title>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-database text-red-500" />
              <span class="text-xl font-bold">État de la Queue Redis (OCR)</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-4">
              <div class="grid">
                <div class="col-12 md:col-4 p-3 bg-surface-50 dark:bg-surface-800 border-round-lg border-1 border-surface-200 dark:border-surface-700 flex justify-content-between">
                  <span class="text-surface-500">Tâches en attente</span>
                  <span class="font-bold">{{ adminStore.queueInfo.pending_jobs || 0 }}</span>
                </div>
                <div class="col-12 md:col-4 p-3 bg-surface-50 dark:bg-surface-800 border-round-lg border-1 border-surface-200 dark:border-surface-700 flex justify-content-between">
                  <span class="text-surface-500">Nom de la queue</span>
                  <span class="font-bold">{{ adminStore.queueInfo.queue_name || 'default' }}</span>
                </div>
                <div class="col-12 md:col-4 p-3 bg-surface-50 dark:bg-surface-800 border-round-lg border-1 border-surface-200 dark:border-surface-700 flex justify-content-between">
                  <span class="text-surface-500">Statut</span>
                  <span class="font-bold" :class="adminStore.queueInfo.status === 'ok' ? 'text-green-500' : 'text-red-500'">
                    {{ adminStore.queueInfo.status === 'ok' ? 'Sain' : 'Saturé' }}
                  </span>
                </div>
              </div>
              <div class="h-32 w-full bg-surface-100 dark:bg-surface-800 border-round-lg flex items-center justify-center text-surface-400 italic">
                [ Flux de traitement OCR en temps réel ]
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Card from '@/components/ui/Card.vue';
import Button from '@/components/ui/Button.vue';
import { useAdminStore } from '@/stores/admin';

const adminStore = useAdminStore();

async function refreshStats() {
  await adminStore.fetchSystemStatus();
}

onMounted(() => {
  refreshStats();
});
</script>

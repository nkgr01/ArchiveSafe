<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Paramètres Système</h1>
        <p class="text-surface-500">Configuration globale de l'infrastructure ArchiveSafe</p>
      </div>
    </div>

    <div class="grid">
      <!-- General Settings -->
      <div class="col-12 lg:col-6">
        <Card>
          <template #title>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-cog text-primary" />
              <span class="text-xl font-bold">Configuration Générale</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-4">
              <div class="flex flex-column gap-2">
                <label class="font-medium">Nom de l'Application</label>
                <InputText v-model="adminStore.settings.app_name" />
              </div>
              <div class="flex flex-column gap-2">
                <label class="font-medium">Fuseau Horaire</label>
                <Dropdown v-model="adminStore.settings.timezone" :options="timezones" />
              </div>
              <div class="flex flex-column gap-2">
                <label class="font-medium">Mode Debug</label>
                <InputSwitch v-model="adminStore.settings.debug_mode" />
              </div>
              <Button label="Sauvegarder" icon="pi pi-check" severity="primary" class="mt-2" @click="saveGeneralSettings" />
            </div>
          </template>
        </Card>
      </div>

      <!-- Logs Access -->
      <div class="col-12 lg:col-6">
        <Card>
          <template #title>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-list text-indigo-500" />
              <span class="text-xl font-bold">Journaux Système</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-4">
              <div class="bg-surface-100 dark:bg-surface-800 p-3 border-round-lg h-64 overflow-auto font-mono text-xs text-surface-600 dark:text-surface-400">
                <pre>{{ adminStore.logs }}</pre>
              </div>
              <Button label="Actualiser les logs" icon="pi pi-refresh" severity="secondary" @click="fetchLogs" />
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import InputText from '@/components/ui/InputText.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import InputSwitch from '@/components/ui/InputSwitch.vue';
import Button from '@/components/ui/Button.vue';
import { useAdminStore } from '@/stores/admin';
import { useNotification } from '@/composables/useNotification';

const notify = useNotification();
const adminStore = useAdminStore();
const timezones = ref(['UTC', 'GMT+1 (Paris)', 'GMT-5 (New York)', 'GMT+8 (Singapore)']);

onMounted(() => {
  adminStore.fetchSettings();
  adminStore.fetchLogs();
});

async function saveGeneralSettings() {
  try {
    await adminStore.updateSettings(adminStore.settings);
    notify.success('Succès', 'Paramètres mis à jour');
  } catch (error: any) {
    notify.error('Erreur', error.response?.data?.message || 'Erreur lors de la sauvegarde');
  }
}

async function fetchLogs() {
  await adminStore.fetchLogs();
}
</script>

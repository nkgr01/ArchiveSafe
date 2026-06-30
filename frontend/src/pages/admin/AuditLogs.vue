<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Logs d'Audit</h1>
        <p class="text-surface-500">Traçabilité complète de toutes les actions effectuées sur la plateforme</p>
      </div>
      <div class="flex gap-2">
        <Button label="Exporter CSV" icon="pi pi-file-excel" severity="secondary" />
      </div>
    </div>

    <!-- Filters Card -->
    <Card>
      <template #content>
        <div class="grid align-items-end gap-3">
          <div class="col-12 md:col-4 flex flex-column gap-2">
            <label class="text-sm font-medium">Recherche</label>
            <InputText v-model="filters.query" placeholder="Utilisateur, action, document..." />
          </div>
          <div class="col-12 md:col-3 flex flex-column gap-2">
            <label class="text-sm font-medium">Action</label>
            <Dropdown v-model="filters.action" :options="actions" placeholder="Toutes" />
          </div>
          <div class="col-12 md:col-3 flex flex-column gap-2">
            <label class="text-sm font-medium">Période</label>
            <DatePicker v-model="filters.dateRange" selectionMode="range" showIcon />
          </div>
          <div class="col-12 md:col-2">
            <Button label="Filtrer" icon="pi pi-filter" severity="primary" class="w-full" @click="applyFilters" />
          </div>
        </div>
      </template>
    </Card>

    <!-- Logs Table -->
    <Card>
      <template #content>
        <div v-if="loading" class="flex justify-content-center py-5">
          <ProgressSpinner style="width: 50px; height: 50px" />
        </div>
        <DataTable v-else :value="logs" responsiveLayout="stack" :paginator="true" :rows="15" class="p-datatable-sm">
          <Column field="created_at" header="Date & Heure" sortable>
            <template #body="slotProps">
              {{ new Date(slotProps.data.created_at).toLocaleString() }}
            </template>
          </Column>
          <Column field="user_id" header="Utilisateur">
            <template #body="slotProps">
              <div class="flex align-items-center gap-2">
                <Avatar :label="slotProps.data.user?.name?.charAt(0) || 'U'" shape="circle" size="small" />
                <span>{{ slotProps.data.user?.name || 'Système' }}</span>
              </div>
            </template>
          </Column>
          <Column field="action" header="Action">
            <template #body="slotProps">
              <span class="font-medium">{{ slotProps.data.action }}</span>
            </template>
          </Column>
          <Column field="model_type" header="Ressource">
            <template #body="slotProps">
              <span class="text-surface-500 italic">{{ slotProps.data.model_type }}</span>
            </template>
          </Column>
          <Column field="ip_address" header="IP Address" class="text-xs text-surface-400"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from '@/components/ui/Card.vue';
import DataTable from '@/components/ui/DataTable.vue';
import Column from '@/components/ui/Column.vue';
import Button from '@/components/ui/Button.vue';
import InputText from '@/components/ui/InputText.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import DatePicker from '@/components/ui/DatePicker.vue';
import Tag from '@/components/ui/Tag.vue';
import Avatar from '@/components/ui/Avatar.vue';
import ProgressSpinner from '@/components/ui/ProgressSpinner.vue';
import api from '@/services/api';

const actions = ref(['ai_summary', 'document_upload', 'user_update', 'login']);
const filters = ref({
  query: '',
  action: null,
  dateRange: null,
});
const logs = ref([]);
const loading = ref(false);

async function fetchLogs() {
  loading.value = true;
  try {
    let url = '/audit-logs';
    if (filters.value.action) {
      url = `/audit-logs/action/${filters.value.action}`;
    }
    const response = await api.get(url);
    logs.value = response.data;
  } catch (error) {
    console.error('Failed to fetch logs:', error);
  } finally {
    loading.value = false;
  }
}

function applyFilters() {
  fetchLogs();
}

onMounted(() => {
  fetchLogs();
});
</script>

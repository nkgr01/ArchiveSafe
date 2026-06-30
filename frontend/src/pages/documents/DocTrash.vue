<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Corbeille</h1>
        <p class="text-surface-500">Documents supprimés. Ils seront définitivement effacés après 30 jours.</p>
      </div>
      <div class="flex gap-2">
        <Button label="Vider la corbeille" icon="pi pi-trash" severity="danger" @click="emptyTrash" />
      </div>
    </div>

    <!-- Trash List -->
    <Card>
      <template #content>
        <DataTable 
          :value="trashedDocs" 
          responsiveLayout="stack" 
          :paginator="true" 
          :rows="10" 
          class="p-datatable-sm"
          :loading="loading"
        >
          <template #empty>
            <div class="text-center py-5 text-surface-500">
              La corbeille est vide.
            </div>
          </template>
          <Column field="title" header="Nom">
            <template #body="slotProps">
              <div class="flex align-items-center gap-2">
                <i :class="['pi', getFileIcon(slotProps.data.mime_type)]" class="text-surface-400" />
                <span class="text-surface-500 line-through">{{ slotProps.data.title }}</span>
              </div>
            </template>
          </Column>
          <Column field="deleted_at" header="Supprimé le" sortable>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.deleted_at) }}
            </template>
          </Column>
          <Column field="file_size" header="Taille" sortable>
            <template #body="slotProps">
              {{ formatBytes(slotProps.data.file_size) }}
            </template>
          </Column>
          <Column header="Actions" class="text-right">
            <template #body="slotProps">
              <div class="flex justify-content-end gap-1">
                <Button icon="pi pi-undo" label="Restaurer" text rounded severity="success" @click="restoreDoc(slotProps.data.id)" />
                <Button icon="pi pi-trash" label="Effacer" text rounded severity="danger" @click="permanentlyDeleteDoc(slotProps.data.id)" />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { DocumentService, type Document } from '@/api/services/document.service';
import { useNotification } from '@/composables/useNotification';
import Card from '@/components/ui/Card.vue';
import DataTable from '@/components/ui/DataTable.vue';
import Column from '@/components/ui/Column.vue';
import Button from '@/components/ui/Button.vue';

const notify = useNotification();
const trashedDocs = ref<Document[]>([]);
const loading = ref(false);

function getFileIcon(mime: string) {
  if (mime.includes('pdf')) return 'pi-file-pdf';
  if (mime.includes('image')) return 'pi-image';
  if (mime.includes('word')) return 'pi-file-word';
  return 'pi-file';
}

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR');
}

async function loadTrash() {
  loading.value = true;
  try {
    trashedDocs.value = await DocumentService.getTrashedDocuments();
    } catch (err) {
    notify.error('Erreur', 'Impossible de charger la corbeille.');
  } finally {
    loading.value = false;
  }
}

async function restoreDoc(id: number) {
  if (!confirm('Voulez-vous restaurer ce document ?')) return;
  try {
    await DocumentService.restoreDocument(id);
    notify.success('Restauré', 'Le document a été restauré avec succès.');
    loadTrash();
  } catch (err) {
    notify.error('Erreur', 'Impossible de restaurer le document.');
  }
}

async function permanentlyDeleteDoc(id: number) {
  if (!confirm('ATTENTION : Cette action est irréversible. Supprimer définitivement ?')) return;
  try {
    await DocumentService.forceDeleteDocument(id);
    notify.success('Supprimé', 'Le document a été effacé définitivement.');
    loadTrash();
  } catch (err) {
    notify.error('Erreur', 'Impossible de supprimer le document.');
  }
}

async function emptyTrash() {
  if (!confirm('Voulez-vous vraiment vider toute la corbeille ?')) return;
  // On simule le vidage en bouclant sur les IDs ou via un endpoint dédié si existait
  try {
    for (const doc of trashedDocs.value) {
      await DocumentService.forceDeleteDocument(doc.id);
    }
    notify.success('Corbeille vidée', 'Tous les documents ont été supprimés.');
    loadTrash();
  } catch (err) {
    notify.error('Erreur', 'Une erreur est survenue lors du vidage de la corbeille.');
  }
}

onMounted(() => {
  loadTrash();
});
</script>

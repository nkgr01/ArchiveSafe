<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Importation de Documents</h1>
        <p class="text-surface-500">Ajoutez vos fichiers pour un traitement OCR et une indexation intelligente</p>
      </div>
    </div>

    <div class="grid">
      <!-- Upload Zone -->
      <div class="col-12 lg:col-7">
        <Card>
          <template #content>
            <div class="flex flex-column align-items-center gap-4 py-5">
              <FileUpload 
                mode="advanced" 
                customUpload
                :uploadHandler="onUpload"
                :auto="true" 
                chooseLabel="Choisir des fichiers" 
                uploadLabel="Importer" 
                cancelLabel="Annuler"
                :multiple="true"
                accept="application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              >
                <template #empty>
                  <div class="flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <i class="pi pi-cloud-upload text-6xl text-surface-300" />
                    <p class="text-surface-500 text-center">
                      Glissez-déposez vos fichiers ici ou <br />
                      <span class="font-bold text-primary">cliquez pour parcourir</span>
                    </p>
                    <small class="text-surface-400">PDF, JPG, PNG, DOCX (Max 50MB par fichier)</small>
                  </div>
                </template>
              </FileUpload>
            </div>
          </template>
        </Card>
      </div>

      <!-- Processing Queue -->
      <div class="col-12 lg:col-5 flex flex-column gap-4">
        <Card>
          <template #title>
            <div class="flex justify-content-between align-items-center">
              <span class="text-xl font-bold">File d'attente OCR</span>
              <Badge :value="queue.length" severity="info" />
            </div>
          </template>
          <template #content>
            <div v-if="queue.length === 0" class="text-center py-5 text-surface-500">
              <i class="pi pi-folder-open text-4xl mb-3 block" />
              Aucun document en cours de traitement.
            </div>
            <div v-else class="flex flex-column gap-4">
              <div v-for="item in queue" :key="item.id" class="flex flex-column gap-2 p-3 border-round-lg bg-surface-50 dark:bg-surface-800 border-1 border-surface-200 dark:border-surface-700">
                <div class="flex justify-content-between align-items-center">
                  <span class="text-sm font-medium truncate max-w-xs">{{ item.name }}</span>
                  <Tag :severity="getStatusSeverity(item.status)" :value="item.status" />
                </div>
                <div class="flex align-items-center gap-3">
                  <ProgressBar :value="item.progress" class="flex-1 h-1" />
                  <span class="text-xs text-surface-500">{{ item.progress }}%</span>
                </div>
                <div class="flex justify-content-between align-items-center mt-1">
                  <span class="text-xs text-surface-400">{{ item.step }}</span>
                  <i v-if="item.status === 'completed'" class="pi pi-check-circle text-green-500" />
                </div>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import FileUpload from '@/components/ui/FileUpload.vue';
import ProgressBar from '@/components/ui/ProgressBar.vue';
import Badge from '@/components/ui/Badge.vue';
import Tag from '@/components/ui/Tag.vue';
import { UploadService } from '@/api/services/upload.service';
import { useNotification } from '@/composables/useNotification';

const notify = useNotification();
const queue = ref<any[]>([]);
const pollingIntervals = new Map<number, any>();

function getStatusSeverity(status: string) {
  switch (status) {
    case 'completed': return 'success';
    case 'pending': return 'warning';
    case 'error': return 'danger';
    default: return 'info';
  }
}

async function onUpload(event: any) {
  const files = event.files;
  
  for (const file of files) {
    // 1. Ajouter à la file d'attente locale
    const queueItem = {
      id: Date.now() + Math.random(),
      name: file.name,
      progress: 0,
      status: 'En cours',
      step: 'Upload...',
      docId: null
    };
    queue.value.unshift(queueItem);

    try {
      // 2. Upload réel avec progression
      const response = await UploadService.uploadFile(
        file, 
        undefined, 
        (percent) => {
          const item = queue.value.find(i => i.id === queueItem.id);
          if (item) {
            item.progress = percent;
            item.step = `Upload ${percent}%...`;
          }
        }
      );

      // 3. Mise à jour après upload réussi
      const item = queue.value.find(i => i.id === queueItem.id);
      if (item) {
        item.docId = response.document.id;
        item.status = response.document.status;
        item.progress = 100;
        item.step = 'Déclenchement OCR...';
      }

      // 4. Démarrer le polling pour l'OCR
      startPolling(item);

    } catch (err: any) {
      const item = queue.value.find(i => i.id === queueItem.id);
      if (item) {
        item.status = 'error';
        item.step = 'Échec de l\'upload';
      }
      notify.error('Erreur Upload', `Impossible d'importer ${file.name}`);
    }
  }
}

async function startPolling(item: any) {
  if (!item.docId) return;

  const interval = setInterval(async () => {
    try {
      const status = await UploadService.getUploadStatus(item.docId);
      
      if (typeof status.status === 'string') {
        item.status = status.status;
      }

      
      if (status.status === 'completed') {
        item.progress = 100;
        item.step = 'Indexé avec succès';
        clearInterval(interval);
        pollingIntervals.delete(item.id);
        notify.success('Succès', `${item.name} a été traité avec succès.`);
      } else if (status.status === 'error') {
        item.step = 'Erreur lors de l\'OCR';
        clearInterval(interval);
        pollingIntervals.delete(item.id);
        notify.error('Erreur OCR', `Le traitement de ${item.name} a échoué.`);
      } else {
        item.step = 'Traitement OCR en cours...';
        // On simule une progression lente pour l'UX si le backend ne donne pas de % précis
        if (item.progress < 90) item.progress += 5;
      }
    } catch (err) {
      console.error('Polling error:', err);
    }
  }, 3000);

  pollingIntervals.set(item.id, interval);
}
</script>

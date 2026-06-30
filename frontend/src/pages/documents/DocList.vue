<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Mes Documents</h1>
        <p class="text-surface-500">Gérez et organisez vos archives intelligentes</p>
      </div>
      <div class="flex gap-2">
        <Button label="Importer" icon="pi pi-upload" severity="primary" @click="goToUpload" />
      </div>
    </div>

    <!-- Main Layout: Tree + Table -->
    <div class="flex gap-4 h-full">
      <!-- Left: Folder Tree -->
      <div class="col-12 md:col-3 flex flex-column gap-4">
        <Card>
          <template #title>
            <span class="text-lg font-bold">Explorateur</span>
          </template>
          <template #content>
            <div v-if="loading" class="flex flex-column gap-2">
              <Skeleton width="100%" height="2rem" class="mb-2" />
              <Skeleton width="80%" height="2rem" class="mb-2 ml-4" />
              <Skeleton width="60%" height="2rem" class="mb-2 ml-8" />
            </div>
            <Tree v-else :value="folders" class="w-full" @node-select="onFolderSelect" />
          </template>
        </Card>
      </div>

      <!-- Right: Document List -->
      <div class="col-12 md:col-9">
        <Card>
          <template #content>
            <div class="flex justify-content-between align-items-center mb-4 gap-3">
              <div class="relative flex-1 max-w-md">
                <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
                <InputText 
                  v-model="searchQuery" 
                  @input="onSearch"
                  placeholder="Rechercher un document..." 
                  class="pl-10 w-full" 
                />
              </div>
              <Button icon="pi pi-filter" label="Filtres" severity="secondary" text @click="showFilters = true" />
            </div>

            <ContextMenu :model="contextMenuItems" />

            <DataTable 
              :value="documents" 
              lazy 
              :paginator="true" 
              :rows="10" 
              :totalRecords="totalRecords"
              @page="onPage"
              @sort="onSort"
              responsiveLayout="stack" 
              class="p-datatable-sm"
              :loading="loading"
            >
              <template #empty>
                <div v-if="!loading" class="text-center py-5 text-surface-500">
                  Aucun document trouvé.
                </div>
              </template>

              <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
              <Column field="title" header="Nom">
                <template #body="slotProps: { data: Document }">
                  <div class="flex align-items-center gap-2">
                    <i :class="['pi', getFileIcon(slotProps.data.mime_type)]" class="text-surface-400" />
                    <span class="cursor-pointer hover:underline" @click="viewDoc(slotProps.data.id)">
                      {{ slotProps.data.title }}
                    </span>
                  </div>
                </template>
              </Column>
              <Column field="file_size" header="Taille" sortable>
                <template #body="slotProps: { data: Document }">
                  {{ formatBytes(slotProps.data.file_size) }}
                </template>
              </Column>
              <Column field="created_at" header="Modifié le" sortable>
                <template #body="slotProps: { data: Document }">
                  {{ formatDate(slotProps.data.created_at) }}
                </template>
              </Column>
              <Column field="status" header="Statut">
                <template #body="slotProps: { data: Document }">
                  <Tag :severity="getStatusSeverity(slotProps.data.status)" :value="slotProps.data.status" />
                </template>
              </Column>
              <Column header="Actions" class="text-right">
                <template #body="slotProps: { data: Document }">
                  <div class="flex justify-content-end gap-1">
                    <Button icon="pi pi-eye" text rounded @click="viewDoc((slotProps.data as Document).id)" />
                    <Button icon="pi pi-download" text rounded @click="downloadDoc((slotProps.data as Document).id)" />
                    <Button icon="pi pi-trash" text rounded severity="danger" @click="deleteDoc((slotProps.data as Document).id)" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>

    <!-- Filters Dialog -->
    <Dialog v-model:visible="showFilters" modal header="Filtres Avancés" :style="{ width: '450px' }">
      <div class="flex flex-column gap-4">
        <div class="flex flex-column gap-2">
          <label class="font-medium">Plage de dates</label>
          <div class="flex gap-2">
            <Calendar v-model="filters.date_from" placeholder="Du..." showIcon />
            <Calendar v-model="filters.date_to" placeholder="Au..." showIcon />
          </div>
        </div>

        <div class="flex flex-column gap-2">
          <label class="font-medium">Tag</label>
          <InputText v-model="filters.tag" placeholder="Ex: Facture, Urgent..." />
        </div>

        <div class="flex flex-column gap-2">
          <label class="font-medium">Correspondant</label>
          <InputText v-model="filters.correspondent" placeholder="Ex: Orange, EDF..." />
        </div>

        <div class="flex flex-column gap-2">
          <label class="font-medium">Type de fichier</label>
          <Dropdown v-model="filters.mime_type" :options="mimeOptions" optionLabel="label" optionValue="value" placeholder="Tous les types" />
        </div>

        <div class="flex align-items-center gap-2 mt-2">
          <ToggleButton v-model="filters.semantic" onLabel="Recherche Standard" offLabel="Recherche IA" />
          <span class="text-xs text-surface-500">Active la recherche sémantique (IA)</span>
        </div>

        <div class="flex justify-content-end gap-2 mt-4">
          <Button label="Réinitialiser" text @click="resetFilters" />
          <Button label="Appliquer" severity="primary" @click="applyFilters" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { DocumentService, type Document } from '@/api/services/document.service';
import { useNotification } from '@/composables/useNotification';
import Card from '@/components/ui/Card.vue';
import Tree from '@/components/ui/Tree.vue';
import DataTable from '@/components/ui/DataTable.vue';
import Column from '@/components/ui/Column.vue';
import Button from '@/components/ui/Button.vue';
import Tag from '@/components/ui/Tag.vue';
import InputText from '@/components/ui/InputText.vue';
import ContextMenu from '@/components/ui/ContextMenu.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import Dialog from '@/components/ui/Dialog.vue';
import Calendar from '@/components/ui/Calendar.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import ToggleButton from '@/components/ui/ToggleButton.vue';

const router = useRouter();
const { success, error: notifyError } = useNotification();
const searchQuery = ref('');
const loading = ref(false);
const documents = ref<Document[]>([]);
const totalRecords = ref(0);
const showFilters = ref(false);

function notifyErrorGeneric(message: string) {
  notifyError('Erreur', message);
}

const lazyParams = ref({
  first: 0,
  rows: 10,
  page: 0,
  sortField: 'created_at',
  sortOrder: -1,
  search: '',
});

const filters = ref({
  date_from: null,
  date_to: null,
  tag: '',
  correspondent: '',
  mime_type: null,
  semantic: false,
});

const mimeOptions = [
  { label: 'PDF', value: 'application/pdf' },
  { label: 'Images', value: 'image' },
  { label: 'Word', value: 'msword' },
  { label: 'Texte', value: 'text/plain' },
];

const folders = ref([
  {
    key: '0',
    label: 'Mes Documents',
    data: '0',
    children: [
      { key: '0-0', label: 'Factures', data: '0', children: [
        { key: '0-0-0', label: '2025', data: '0' },
        { key: '0-0-1', label: '2026', data: '0' },
      ]},
      { key: '0-1', label: 'Contrats', data: '0' },
      { key: '0-2', label: 'Identité', data: '0' },
    ]
  }
]);

const selectedDoc = ref<Document | null>(null);

const contextMenuItems = ref([
  { label: 'Renommer', icon: 'pi pi-pencil', command: () => renameDoc() },
  { label: 'Déplacer', icon: 'pi pi-folder-open', command: () => moveDoc() },
  { label: 'Télécharger', icon: 'pi pi-download', command: () => selectedDoc.value && downloadDoc(selectedDoc.value.id) },
  { separator: true },
  { label: 'Supprimer', icon: 'pi pi-trash', command: () => selectedDoc.value && deleteDoc(selectedDoc.value.id), severity: 'danger' },
]);

async function loadDocuments() {
  loading.value = true;
  try {
    const params = {
      search: lazyParams.value.search,
      sortField: lazyParams.value.sortField,
      sortOrder: lazyParams.value.sortOrder === 1 ? 'asc' : 'desc',
      rows: lazyParams.value.rows,
      page: (lazyParams.value.first / lazyParams.value.rows) + 1,
      ...filters.value,
    };
    const result = await DocumentService.getDocuments(params);
    documents.value = result.data;
    totalRecords.value = result.totalRecords;
  } catch (err: any) {
    notifyError('Erreur', 'Impossible de charger les documents.');
  } finally {
    loading.value = false;
  }
}

function onPage(event: any) {
  lazyParams.value.first = event.first;
  lazyParams.value.rows = event.rows;
  loadDocuments();
}

function onSort(event: any) {
  lazyParams.value.sortField = event.sortField;
  lazyParams.value.sortOrder = event.sortOrder;
  loadDocuments();
}

function onSearch() {
  lazyParams.value.search = searchQuery.value;
  lazyParams.value.first = 0;
  loadDocuments();
}

function applyFilters() {
  lazyParams.value.first = 0;
  loadDocuments();
  showFilters.value = false;
}

function resetFilters() {
  filters.value = {
    date_from: null,
    date_to: null,
    tag: '',
    correspondent: '',
    mime_type: null,
    semantic: false,
  };
  lazyParams.value.first = 0;
  loadDocuments();
}

function getFileIcon(mime: string) {
  if (!mime) return 'pi-file';
  if (mime.includes('pdf')) return 'pi-file-pdf';
  if (mime.includes('image')) return 'pi-image';
  if (mime.includes('word')) return 'pi-file-word';
  return 'pi-file';
}

function getStatusSeverity(status: string) {
  switch (status) {
    case 'completed': return 'success';
    case 'pending': return 'warning';
    case 'error': return 'danger';
    default: return 'info';
  }
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

function onFolderSelect(event: any) {
  console.log('Dossier sélectionné:', event.node.label);
}

async function viewDoc(id: number) { router.push(`/documents/${id}`); }
function goToUpload() { router.push('/upload'); }
function downloadDoc(id: number) { console.log('Téléchargement:', id); }

async function deleteDoc(id: number) {
  if (!confirm('Voulez-vous vraiment déplacer ce document vers la corbeille ?')) return;
  try {
    await DocumentService.deleteDocument(id);
    success('Supprimé', 'Le document a été déplacé vers la corbeille.');
    loadDocuments();
  } catch (err: any) {
    notifyError('Erreur', 'Impossible de supprimer le document.');
  }
}

function toggleFilters() { showFilters.value = true; }
function renameDoc() { console.log('Renommage...'); }
function moveDoc() { console.log('Déplacement...'); }

onMounted(() => {
  loadDocuments();
});
</script>

<template>
  <div class="flex flex-column gap-4 h-full">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Détails du Document</h1>
        <p class="text-surface-500">Visualisation et gestion des métadonnées</p>
      </div>
      <Button label="Retour" icon="pi pi-arrow-left" severity="secondary" text @click="$router.back()" />
    </div>

    <!-- Main Content: Splitter -->
    <div class="flex-1 grid">
      <!-- Left: Viewer -->
      <div class="col-12 lg:col-8 h-full">
        <div v-if="loading" class="flex justify-content-center align-items-center h-full">
          <i class="pi pi-spin pi-spinner text-4xl" />
        </div>
        <DocViewer v-else :docId="docId" />
      </div>

      <!-- Right: Metadata & IA Panel -->
      <div class="col-12 lg:col-4 flex flex-column gap-4 h-full">
        <div v-if="loading" class="flex flex-column gap-4">
          <Skeleton width="100%" height="20rem" />
        </div>
        <TabView v-else>
          <TabPanel :value="0">
            <Panel header="Informations" :toggleable="false">
              <DocMetadataPanel :docId="docId" :document="document" />
            </Panel>
          </TabPanel>
          <TabPanel :value="1">
            <Panel header="Analyse IA" :toggleable="false">
              <div class="flex flex-column gap-4">
                <div class="p-3 bg-indigo-50 dark:bg-indigo-900/20 border-round-lg border-left-3 border-indigo-500">
                  <div class="flex align-items-center gap-2 mb-2">
                    <i class="pi pi-sparkles text-indigo-500" />
                    <span class="font-bold text-indigo-700 dark:text-indigo-300">Résumé Automatique</span>
                  </div>
                  <p class="text-sm leading-relaxed">
                    {{ document?.ai_summary || 'Analyse en cours ou non disponible pour ce document.' }}
                  </p>
                </div>

                <div class="flex flex-column gap-2">
                  <span class="text-sm font-medium">Entités Extraites</span>
                  <div class="flex flex-wrap gap-2">
                    <Tag v-for="tag in tags" :key="tag" :value="tag" severity="secondary" />
                    <span v-if="tags.length === 0" class="text-xs text-surface-500">Aucune entité extraite.</span>
                  </div>
                </div>

                <Button label="Lancer le Chat IA" icon="pi pi-comments" severity="primary" 
                        class="w-full" @click="goToAIChat" />
              </div>
            </Panel>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { DocumentService, type Document } from '@/api/services/document.service';
import Button from '@/components/ui/Button.vue';
import TabView from '@/components/ui/TabView.vue';
import TabPanel from '@/components/ui/TabPanel.vue';
import Panel from '@/components/ui/Panel.vue';
import Tag from '@/components/ui/Tag.vue';
import DocViewer from '@/components/domain/docs/DocViewer.vue';
import DocMetadataPanel from '@/components/domain/docs/DocMetadataPanel.vue';
import { useNotification } from '@/composables/useNotification';

const route = useRoute();
const router = useRouter();
const notify = useNotification();
const docId = computed(() => route.params.id);
const document = ref<Document | null>(null);
const loading = ref(true);

const tags = computed(() => {
  return document.value?.metadata?.tags || [];
});

async function loadDocument() {
  loading.value = true;
  try {
    document.value = await DocumentService.getDocument(Number(docId.value));
  } catch (err) {
    notify.error('Erreur', 'Impossible de charger les détails du document.');
  } finally {
    loading.value = false;
  }
}

function goToAIChat() {
  router.push(`/ai/chat/${docId.value}`);
}

onMounted(() => {
  loadDocument();
});
</script>

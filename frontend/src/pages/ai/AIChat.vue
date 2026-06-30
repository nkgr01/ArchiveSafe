<template>
  <div class="flex flex-column gap-4 h-full">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Assistant IA</h1>
        <p class="text-surface-500">Dialogue interactif basé sur le contenu du document</p>
      </div>
      <Button label="Retour" icon="pi pi-arrow-left" severity="secondary" text @click="$router.back()" />
    </div>

    <div class="grid h-full">
      <!-- Left: Document Viewer (Small) -->
      <div class="col-12 lg:col-5 h-full">
        <Card class="h-full">
          <template #content>
            <div class="flex flex-column h-full gap-3">
              <div class="text-sm font-bold flex align-items-center gap-2">
                <i class="pi pi-file-pdf text-red-500" />
                {{ fileName }}
              </div>
              <div class="bg-surface-100 dark:bg-surface-800 aspect-[1/1.4] border-round-lg flex items-center justify-center text-surface-400 italic border-1 border-surface-200 dark:border-surface-700">
                Aperçu du document
              </div>
            </div>
          </template>
        </Card>
      </div>

      <!-- Right: Chat Interface -->
      <div class="col-12 lg:col-7 h-full">
        <AIChatWindow />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import AIChatWindow from '@/components/domain/ai/AIChatWindow.vue';

const route = useRoute();
const fileName = computed(() => `Document_${route.params.id}.pdf`);
</script>

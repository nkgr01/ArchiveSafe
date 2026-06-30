<template>
  <div class="flex flex-column gap-4 h-full">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Exploration Sémantique</h1>
        <p class="text-surface-500">Analyse globale et recherche conceptuelle sur tout votre corpus</p>
      </div>
    </div>

    <!-- Search Bar -->
    <Card>
      <template #content>
        <div class="flex gap-3">
          <div class="relative flex-1">
            <i class="pi pi-sparkles absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" />
            <InputText 
              v-model="searchQuery" 
              placeholder="Ex: 'Quels sont les contrats qui expirent en 2026 ?' ou 'Analyse les risques fiscaux'" 
              class="pl-10 w-full p-inputtext-lg" 
              @keyup.enter="performSemanticSearch"
            />
          </div>
          <Button label="Analyser" icon="pi pi-search" severity="primary" @click="performSemanticSearch" :disabled="aiStore.isLoading" />
        </div>
      </template>
    </Card>

    <!-- Results Area -->
    <div v-if="aiStore.searchResults.length > 0" class="grid">
      <div v-for="res in aiStore.searchResults" :key="res.id" class="col-12 md:col-6 lg:col-4">
        <Card class="h-full hover:shadow-4 transition-all cursor-pointer" @click="viewDoc(res.id)">
          <template #title>
            <div class="flex justify-content-between align-items-start">
              <span class="font-bold truncate">{{ res.docName }}</span>
              <Tag :value="res.score + '%'" severity="success" />
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-3">
              <p class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                {{ res.excerpt }}
              </p>
              <div class="flex flex-wrap gap-1">
                <Tag v-for="tag in res.tags" :key="tag" :value="tag" severity="secondary" class="text-[10px]" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div v-else-if="!aiStore.isLoading" class="flex flex-column align-items-center justify-content-center py-8 text-surface-400">
      <i class="pi pi-search-plus text-6xl mb-4" />
      <p>Saisissez une requête pour explorer vos documents via l'IA</p>
    </div>

    <div v-if="aiStore.isLoading" class="flex flex-column align-items-center justify-content-center py-8">
      <ProgressSpinner style="width: 50px; height: 50px" />
      <p class="mt-4 text-surface-500">L'IA analyse vos documents...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from '@/components/ui/Card.vue';
import InputText from '@/components/ui/InputText.vue';
import Button from '@/components/ui/Button.vue';
import Tag from '@/components/ui/Tag.vue';
import ProgressSpinner from '@/components/ui/ProgressSpinner.vue';
import { useAIStore } from '@/stores/ai';

const router = useRouter();
const aiStore = useAIStore();
const searchQuery = ref('');

async function performSemanticSearch() {
  if (!searchQuery.value) return;
  await aiStore.performSemanticSearch(searchQuery.value);
}

function viewDoc(id: number) {
  router.push(`/documents/${id}`);
}
</script>

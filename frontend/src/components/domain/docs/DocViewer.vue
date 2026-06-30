<template>
  <div class="flex flex-column h-full">
    <!-- Document Viewer Component -->
    <div class="flex-1 bg-surface-100 dark:bg-surface-800 rounded-lg overflow-hidden relative border-1 border-surface-200 dark:border-surface-700">
      <!-- Toolbar -->
      <div class="absolute top-0 left-0 right-0 h-12 bg-surface-0 dark:bg-surface-900 flex items-center justify-between px-4 z-10 shadow-2">
        <div class="flex items-center gap-3">
          <Button icon="pi pi-arrow-left" text rounded @click="$router.back()" />
          <span class="font-medium truncate max-w-xs">{{ fileName }}</span>
        </div>
        <div class="flex gap-2">
          <Button icon="pi pi-download" severity="secondary" text rounded />
          <Button icon="pi pi-print" severity="secondary" text rounded />
          <Button icon="pi pi-trash" severity="danger" text rounded @click="deleteDocument" />
        </div>
      </div>

      <!-- Document Display Area -->
      <div class="h-full w-full flex items-center justify-center p-12 pt-20">
        <!-- Mock PDF/Image Viewer -->
        <div class="bg-white dark:bg-surface-700 shadow-lg w-full max-w-4xl aspect-[1/1.414] flex items-center justify-center text-surface-400 italic border-1 border-surface-200 dark:border-surface-600">
          Visualisation du document : {{ fileName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Button from '@/components/ui/Button.vue';

const route = useRoute();
const fileName = computed(() => `Document_${route.params.id}.pdf`);

function deleteDocument() {
  // Logic for deletion
}
</script>

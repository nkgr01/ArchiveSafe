<template>
  <div class="flex flex-column align-items-center justify-content-center text-center p-8 min-h-[60vh]">
    <div class="text-9xl font-bold text-surface-200 dark:text-surface-800 mb-4">404</div>
    <i class="pi pi-search-plus text-6xl text-primary mb-6" />
    <h1 class="text-4xl font-bold text-surface-900 dark:text-surface-0 mb-4">Page non trouvée</h1>
    <p class="text-surface-500 text-lg mb-8 max-w-md">
      Oups ! La page que vous recherchez a été déplacée, supprimée ou n'a jamais existé.
    </p>
    <Button label="Retour au Dashboard" icon="pi pi-home" severity="primary" size="large" @click="$router.push('/dashboard')" />
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
</script>

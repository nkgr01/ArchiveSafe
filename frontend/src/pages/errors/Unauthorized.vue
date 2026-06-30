<template>
  <div class="flex flex-column align-items-center justify-content-center text-center p-8 min-h-[60vh]">
    <div class="text-9xl font-bold text-surface-200 dark:text-surface-800 mb-4">403</div>
    <i class="pi pi-lock text-6xl text-red-500 mb-6" />
    <h1 class="text-4xl font-bold text-surface-900 dark:text-surface-0 mb-4">Accès Refusé</h1>
    <p class="text-surface-500 text-lg mb-8 max-w-md">
      Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette ressource.
    </p>
    <Button label="Retourner en sécurité" icon="pi pi-arrow-left" severity="primary" size="large" @click="$router.push('/dashboard')" />
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
</script>

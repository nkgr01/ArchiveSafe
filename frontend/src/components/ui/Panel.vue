<template>
  <div class="rounded-3xl border border-surface-200 bg-surface-50 p-4 dark:border-surface-800 dark:bg-surface-950">
    <div v-if="header" class="mb-4 flex items-center justify-between gap-3">
      <h2 class="text-lg font-semibold">{{ header }}</h2>
      <slot name="headerRight" />
    </div>
    <div><slot /></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ header: String });
</script>

<template>
  <div class="rounded-[1.75rem] border border-surface-200 bg-white p-0 shadow-sm dark:border-surface-800 dark:bg-surface-950 overflow-hidden">
    <div v-if="$slots.title" class="px-6 py-4 border-b border-surface-200 dark:border-surface-800">
      <slot name="title" />
    </div>
    <div class="px-6 py-6">
      <slot name="content" />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({});
</script>

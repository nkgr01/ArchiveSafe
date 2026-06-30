<template>
  <div class="h-2 w-full overflow-hidden rounded-full bg-surface-200 dark:bg-surface-800">
    <div class="h-full rounded-full bg-primary transition-all" :style="{ width: `${value}%` }"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ value: { type: Number, default: 0 } });
</script>

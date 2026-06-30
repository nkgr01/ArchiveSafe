<template>
  <div class="animate-pulse rounded-xl bg-surface-200 dark:bg-surface-800" :style="style"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  style: { type: [String, Object], default: '' },
});
</script>

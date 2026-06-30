<template>
  <span :class="['inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', badgeClass]">{{ value }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  value: [String, Number],
  severity: { type: String, default: 'info' },
});
const badgeClass = computed(() => {
  switch (props.severity) {
    case 'success': return 'bg-green-100 text-green-700';
    case 'danger': return 'bg-red-100 text-red-700';
    case 'warning': return 'bg-amber-100 text-amber-700';
    default: return 'bg-surface-100 text-surface-700';
  }
});
</script>

<template>
  <span :class="tagClasses">
    <slot>{{ value }}</slot>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  value: [String, Number],
  severity: { type: String, default: 'secondary' },
});
const tagClasses = computed(() => {
  const base = ['inline-flex', 'items-center', 'rounded-full', 'px-3', 'py-1', 'text-xs', 'font-medium'];
  switch (props.severity) {
    case 'success':
      base.push('bg-green-100', 'text-green-700');
      break;
    case 'warning':
      base.push('bg-amber-100', 'text-amber-700');
      break;
    case 'danger':
      base.push('bg-red-100', 'text-red-700');
      break;
    case 'info':
      base.push('bg-sky-100', 'text-sky-700');
      break;
    default:
      base.push('bg-surface-100', 'text-surface-700');
  }
  return base.flat().filter(Boolean).join(' ');
});
</script>

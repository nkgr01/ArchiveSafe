<template>
  <div :class="avatarClasses">
    <slot>{{ label }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  label: String,
  icon: String,
  shape: { type: String, default: 'circle' },
  size: { type: String, default: 'normal' },
});
const avatarClasses = computed(() => {
  const sizeClass = props.size === 'small' ? 'w-8 h-8 text-sm' : props.size === 'large' ? 'w-14 h-14 text-xl' : 'w-10 h-10 text-base';
  return [
    'inline-flex',
    'items-center',
    'justify-center',
    'rounded-full',
    'bg-surface-200',
    'text-surface-900',
    'font-semibold',
    sizeClass,
  ].flat().filter(Boolean).join(' ');
});
</script>

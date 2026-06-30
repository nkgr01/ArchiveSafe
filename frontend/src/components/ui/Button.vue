<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="inline-flex items-center gap-2">
      <span class="loader"></span>
      <span>Chargement...</span>
    </span>
    <template v-else>
      <i v-if="icon" :class="['pi', icon, 'text-base']" />
      <span v-if="label">{{ label }}</span>
      <slot />
    </template>
  </button>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
const props = defineProps({
  label: String,
  icon: String,
  severity: { type: String, default: 'primary' },
  text: Boolean,
  rounded: Boolean,
  size: String,
  disabled: Boolean,
  loading: Boolean,
  type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
});
const emit = defineEmits(['click']);
const buttonClasses = computed(() => {
  const base = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
    'transition',
    'duration-150',
    'font-semibold',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-primary/50',
    props.size === 'small' ? 'px-3 py-2 text-sm' : props.size === 'large' ? 'px-5 py-3 text-base' : 'px-4 py-2 text-sm',
    props.rounded ? 'rounded-full' : 'rounded-xl',
  ];

  if (props.text) {
    base.push('bg-transparent', 'text-primary', 'hover:bg-surface-100', 'dark:hover:bg-surface-800');
  } else {
    switch (props.severity) {
      case 'secondary':
        base.push('bg-surface-100', 'text-surface-900', 'hover:bg-surface-200', 'dark:bg-surface-800', 'dark:text-surface-100', 'dark:hover:bg-surface-700');
        break;
      case 'danger':
        base.push('bg-red-600', 'text-white', 'hover:bg-red-700');
        break;
      case 'success':
        base.push('bg-green-600', 'text-white', 'hover:bg-green-700');
        break;
      case 'info':
        base.push('bg-sky-600', 'text-white', 'hover:bg-sky-700');
        break;
      default:
        base.push('bg-primary', 'text-white', 'hover:bg-primary-hover');
    }
  }

  if (props.disabled || props.loading) {
    base.push('opacity-60', 'cursor-not-allowed');
  }

  return base.flat().filter(Boolean).join(' ');
});
function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) return;
  emit('click', event);
}
</script>

<style scoped>
.loader {
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 9999px;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>

<template>
  <button
    type="button"
    @click="toggle"
    :class="[
      'inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition duration-150',
      value ? 'bg-primary text-white border-primary' : 'bg-surface-100 text-surface-700 border-surface-300 hover:bg-surface-200'
    ]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
const props = defineProps({
  modelValue: { type: Boolean as PropType<boolean>, default: false },
  onLabel: { type: String, default: 'Oui' },
  offLabel: { type: String, default: 'Non' },
  disabled: Boolean,
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>();

const value = computed(() => props.modelValue ?? false);
const label = computed(() => (value.value ? props.onLabel : props.offLabel));
function toggle() {
  if (props.disabled) return;
  emit('update:modelValue', !value.value);
}
</script>

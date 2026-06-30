<template>
  <label class="inline-flex cursor-pointer items-center gap-3">
    <input
      type="checkbox"
      :checked="value"
      @change="onChange"
      class="sr-only"
      :disabled="disabled"
    />
    <span
      class="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-200 transition-colors duration-200"
      :class="value ? 'bg-primary' : 'bg-surface-300'"
    >
      <span
        class="inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
        :class="value ? 'translate-x-5' : 'translate-x-1'"
      ></span>
    </span>
    <span>{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
const props = defineProps({
  modelValue: { type: Boolean as PropType<boolean>, default: false },
  label: { type: String, default: '' },
  disabled: Boolean,
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>();
const value = computed(() => props.modelValue ?? false);
function onChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  emit('update:modelValue', target?.checked ?? false);
}
</script>

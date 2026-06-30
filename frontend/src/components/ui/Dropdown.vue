<template>
  <select
    :value="modelValue"
    @change="onChange"
    class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
  >
    <option v-if="placeholder" value="">{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value ?? option" :value="option.value ?? option">
      {{ option.label ?? option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
const props = defineProps({
  modelValue: [String, Number, Boolean, Object, Array] as PropType<any>,
  options: { type: Array as PropType<any[]>, default: () => [] },
  placeholder: String,
});
const emit = defineEmits(['update:modelValue']);
function onChange(event: Event) {
  const target = event.target as HTMLSelectElement | null;
  emit('update:modelValue', target?.value ?? null);
}
</script>

<template>
  <div class="flex items-center gap-2">
    <span v-if="showIcon" class="text-surface-500"><i class="pi pi-calendar" /></span>
    <input
      type="date"
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  </div>
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
const props = defineProps({
  modelValue: { type: String as PropType<string | null>, default: null },
  placeholder: String,
  showIcon: Boolean,
  disabled: Boolean,
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | null): void
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  emit('update:modelValue', target?.value ?? null);
}
</script>

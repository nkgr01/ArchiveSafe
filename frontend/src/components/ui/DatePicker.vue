<template>
  <div class="flex items-center gap-2">
    <span v-if="showIcon" class="text-surface-500"><i class="pi pi-calendar" /></span>
    <div v-if="selectionMode === 'range'" class="flex gap-2">
      <input
        type="date"
        :value="startValue"
        @input="onStartChange"
        class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <input
        type="date"
        :value="endValue"
        @input="onEndChange"
        class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
    <input
      v-else
      type="date"
      :value="value"
      @input="onChange"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType } from 'vue';
const props = defineProps({
  modelValue: { type: [String, Array] as PropType<string | (string | null)[] | null>, default: null },
  selectionMode: { type: String as PropType<'single' | 'range'>, default: 'single' },
  placeholder: String,
  showIcon: Boolean,
  disabled: Boolean,
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: string | (string | null)[] | null): void
  (event: 'change', value: string | (string | null)[] | null): void
}>();

const value = computed(() => (typeof props.modelValue === 'string' ? props.modelValue : ''));
const startValue = computed(() => (Array.isArray(props.modelValue) ? props.modelValue[0] ?? '' : ''));
const endValue = computed(() => (Array.isArray(props.modelValue) ? props.modelValue[1] ?? '' : ''));

function onChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  emit('update:modelValue', target?.value ?? null);
}

function onStartChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  emit('update:modelValue', [target?.value ?? null, endValue.value ?? null]);
}

function onEndChange(event: Event) {
  const target = event.target as HTMLInputElement | null;
  emit('update:modelValue', [startValue.value ?? null, target?.value ?? null]);
}
</script>

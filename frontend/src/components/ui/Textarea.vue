<template>
  <textarea
    :rows="rows"
    :value="modelValue"
    :placeholder="placeholder"
    @input="onInput"
    class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
  />
</template>

<script setup lang="ts">
import { type PropType } from 'vue';
const props = defineProps({ modelValue: String, rows: { type: [String, Number] as PropType<string | number>, default: 4 }, placeholder: String });
const emit = defineEmits(['update:modelValue']);
function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement | null;
  emit('update:modelValue', target?.value ?? '');
}
</script>

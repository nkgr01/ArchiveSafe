<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
    @input="onInput"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: [String, Number],
  placeholder: String,
  type: { type: String, default: 'text' },
  disabled: Boolean,
});
const emit = defineEmits(['update:modelValue']);
function onInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  emit('update:modelValue', target?.value ?? '');
}
</script>

<template>
  <div class="space-y-2">
    <div class="flex flex-wrap gap-2">
      <span v-for="(tag,index) in modelValue" :key="tag + index" class="inline-flex items-center gap-2 rounded-full bg-surface-100 px-3 py-1 text-sm text-surface-700">
        {{ tag }}
        <button type="button" @click="removeTag(index)" class="text-surface-500 hover:text-surface-900">×</button>
      </span>
    </div>
    <input
      type="text"
      v-model="inputValue"
      @keyup.enter.prevent="addTag"
      :placeholder="placeholder"
      class="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm text-surface-900 focus:border-primary focus:ring-2 focus:ring-primary/20"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';
const props = defineProps({ modelValue: { type: Array as PropType<any[]>, default: () => [] }, placeholder: String });
const emit = defineEmits(['update:modelValue']);
const inputValue = ref('');
function addTag() {
  if (!inputValue.value.trim()) return;
  emit('update:modelValue', [...props.modelValue, inputValue.value.trim()]);
  inputValue.value = '';
}
function removeTag(index: number) {
  const next = [...props.modelValue];
  next.splice(index, 1);
  emit('update:modelValue', next);
}
watch(() => props.modelValue, (value) => {
  if (!Array.isArray(value)) emit('update:modelValue', []);
});
</script>

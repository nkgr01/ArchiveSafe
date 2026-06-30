<template>
  <div class="rounded-3xl border border-surface-200 bg-surface-50 p-4 text-center">
    <div class="flex flex-col items-center justify-center gap-3">
      <slot />
      <input
        ref="input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="hidden"
        @change="handleFiles"
      />
      <button type="button" class="rounded-xl bg-primary px-4 py-2 text-white" @click="openDialog">Choisir des fichiers</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
const props = defineProps({
  mode: String,
  customUpload: Boolean,
  uploadHandler: Function as PropType<((event: { files: File[] }) => Promise<void>) | undefined>,
  auto: Boolean,
  chooseLabel: String,
  uploadLabel: String,
  cancelLabel: String,
  multiple: Boolean,
  accept: String,
});
const emit = defineEmits<{
  (event: 'update:modelValue', value: File[] | null): void
}>();
const input = ref<HTMLInputElement | null>(null);

function openDialog() {
  input.value?.click();
}

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement | null;
  const files = target?.files ? Array.from(target.files) : [];
  if (props.uploadHandler) {
    props.uploadHandler({ files });
  }
  emit('update:modelValue', files);
}
</script>

<template>
  <transition name="dialog-fade" appear>
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div :style="style" class="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl dark:bg-surface-950">
        <div class="flex items-center justify-between gap-4 mb-4">
          <div>
            <h2 v-if="header" class="text-xl font-semibold">{{ header }}</h2>
            <p v-if="subHeader" class="text-sm text-surface-500">{{ subHeader }}</p>
          </div>
          <button type="button" class="text-surface-500 hover:text-surface-900" @click="close">×</button>
        </div>
        <div>
          <slot />
        </div>
        <div v-if="$slots.footer" class="mt-6 flex justify-end gap-3">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { watch, type CSSProperties, type PropType } from 'vue';
const props = defineProps({
  modelValue: Boolean,
  visible: Boolean,
  header: String,
  subHeader: String,
  modal: Boolean,
  style: { type: [String, Object] as PropType<string | CSSProperties>, default: '' },
});
const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void
  (event: 'update:modelValue', value: boolean): void
}>();

function close() {
  emit('update:visible', false);
  emit('update:modelValue', false);
}

watch(() => props.modelValue, (value) => {
  if (value !== undefined && value !== props.visible) {
    emit('update:visible', value);
  }
});
</script>

<style scoped>
.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.2s ease;
}
.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}
</style>

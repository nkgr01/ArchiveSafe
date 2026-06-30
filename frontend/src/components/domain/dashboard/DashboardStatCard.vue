<template>
  <div class="p-4 bg-surface-0 dark:bg-surface-800 border-round-xl border-1 border-surface-200 dark:border-surface-700 shadow-1 flex flex-column gap-2 hover:shadow-3 transition-all cursor-pointer">
    <div class="flex justify-content-between align-items-start">
      <div :class="['w-3rem h-3rem border-round flex items-center justify-center text-2xl', color, 'bg-opacity-10']">
        <i :class="['pi', icon]" />
      </div>
      <span class="text-xs font-medium text-surface-500">{{ trend }}</span>
    </div>
    <div class="mt-3">
      <span class="text-surface-500 text-sm block mb-1">{{ title }}</span>
      <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: string;
  icon: string;
  color: string;
  trend: string;
}>();
</script>

<style scoped>
/* Custom color utility if not available in Tailwind config */
.text-blue-500 { color: #3B82F6; }
.text-purple-500 { color: #A855F7; }
.text-orange-500 { color: #F97316; }
.text-green-500 { color: #10B981; }
</style>

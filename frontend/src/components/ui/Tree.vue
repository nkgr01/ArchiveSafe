<template>
  <ul class="space-y-2">
    <li v-for="node in value" :key="node.key">
      <button type="button" @click="selectNode(node)" class="w-full text-left rounded-xl px-3 py-2 hover:bg-surface-100 dark:hover:bg-surface-800">{{ node.label }}</button>
      <Tree v-if="node.children?.length" :value="node.children" @node-select="$emit('node-select', $event)" class="ml-4" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, type PropType } from 'vue';
const props = defineProps({ value: { type: Array as PropType<any[]>, default: () => [] } });
const emit = defineEmits(['node-select']);
function selectNode(node: any) { emit('node-select', node); }
</script>

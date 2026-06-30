<template>
  <div class="overflow-y-auto" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ style: { type: [String, Object], default: '' } });
</script>

<template><div><slot /></div></template>

<script setup lang="ts">
const props = defineProps({ value: [String, Number] });
</script>

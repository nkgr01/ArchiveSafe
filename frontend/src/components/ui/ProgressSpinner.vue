<template>
  <div class="inline-flex items-center justify-center">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(148, 163, 184, 0.3);
  border-top-color: rgb(37 99 235);
  border-radius: 9999px;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>

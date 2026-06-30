<template>
  <div class="min-h-screen grid lg:grid-cols-[300px_1fr] bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100">
    <aside class="border-r border-surface-200 dark:border-surface-800 bg-surface-0 dark:bg-surface-950">
      <AppSidebar />
    </aside>

    <div class="flex flex-col min-h-screen">
      <AppHeader />

      <main class="flex-1 overflow-y-auto p-4 lg:p-6">
        <div class="max-w-screen-2xl mx-auto">
          <AppBreadcrumb />
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/domain/layout/AppHeader.vue';
import AppSidebar from '@/components/domain/layout/AppSidebar.vue';
import AppBreadcrumb from '@/components/domain/layout/AppBreadcrumb.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

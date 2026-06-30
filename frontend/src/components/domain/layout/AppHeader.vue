<template>
  <header class="sticky top-0 z-20 border-b border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 px-4 lg:px-6 py-3 shadow-sm">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <span class="text-xl font-semibold tracking-tight">ArchiveSafe</span>
          <span class="px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] rounded-full bg-primary-100 text-primary">Enterprise</span>
        </div>
      </div>

      <div class="flex-1 hidden lg:flex items-center justify-center">
        <div class="relative w-full max-w-2xl">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <InputText
            placeholder="Rechercher un document, une demande ou un projet..."
            class="pl-10 w-full p-inputtext-sm shadow-sm"
          />
        </div>
      </div>

      <div class="flex items-center gap-2 justify-end">
        <Button icon="pi pi-bell" severity="secondary" text rounded />
        <Button icon="pi pi-cog" severity="secondary" text rounded />
        <div class="flex items-center gap-3 rounded-full border border-surface-200 dark:border-surface-800 bg-surface-100 dark:bg-surface-950 px-3 py-2">
          <Avatar :label="userInitials" shape="circle" size="small" class="bg-primary text-white" />
          <div class="hidden sm:flex flex-col leading-tight">
            <span class="text-sm font-semibold">{{ userName }}</span>
            <span class="text-xs text-surface-500 dark:text-surface-400">{{ userRole }}</span>
          </div>
        </div>
        <Button icon="pi pi-sign-out" severity="danger" text rounded size="small" @click="handleLogout" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import InputText from '@/components/ui/InputText.vue';
import Button from '@/components/ui/Button.vue';
import Avatar from '@/components/ui/Avatar.vue';
import { useThemeStore } from '@/stores/theme';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const themeStore = useThemeStore();
const authStore = useAuthStore();
const router = useRouter();
const { success } = useNotification();

const userName = computed(() => authStore.user?.name || 'Utilisateur');
const userRole = computed(() => authStore.user?.role ? authStore.user.role.charAt(0).toUpperCase() + authStore.user.role.slice(1) : 'Invité');
const userInitials = computed(() => {
  const name = authStore.user?.name || 'AS';
  return name
    .split(' ')
    .map((segment) => segment.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
});

const toggleTheme = () => themeStore.toggleDark();

async function handleLogout() {
  await authStore.logout();
  success('Déconnexion', 'Vous avez été déconnecté avec succès.');
  router.push('/auth/login');
}
</script>

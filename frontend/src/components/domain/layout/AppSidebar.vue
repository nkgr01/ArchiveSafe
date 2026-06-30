<template>
  <div class="h-screen min-h-screen flex flex-col bg-surface-0 dark:bg-surface-950 text-surface-900 dark:text-surface-100">
    <div class="px-6 py-5 border-b border-surface-200 dark:border-surface-800 flex items-center gap-3">
      <div class="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white text-lg font-bold">AS</div>
      <div>
        <div class="text-lg font-semibold">ArchiveSafe</div>
        <div class="text-sm text-surface-500 dark:text-surface-400">Gestion documentaire</div>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-6">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-surface-500 mb-3">Navigation principale</p>
        <ul class="space-y-1">
          <li v-for="item in mainMenu" :key="item.label">
            <router-link
              :to="item.to"
              class="group flex items-center gap-3 rounded-2xl px-3 py-3 transition duration-150"
              :class="{
                'bg-primary text-white shadow-md': isActive(item.to),
                'text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-900': !isActive(item.to)
              }"
            >
              <i :class="['pi', item.icon, 'text-lg']" />
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.24em] text-surface-500 mb-3">Administration</p>
        <ul class="space-y-1">
          <li v-for="item in adminMenu" :key="item.label">
            <router-link
              :to="item.to"
              class="group flex items-center gap-3 rounded-2xl px-3 py-3 transition duration-150"
              :class="{
                'bg-primary text-white shadow-md': isActive(item.to),
                'text-surface-700 dark:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-900': !isActive(item.to)
              }"
            >
              <i :class="['pi', item.icon, 'text-lg']" />
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="px-6 py-5 border-t border-surface-200 dark:border-surface-800">
      <div class="flex items-center gap-3">
        <Avatar :label="userInitials" shape="circle" size="large" class="bg-primary text-white" />
        <div>
          <div class="font-semibold">{{ userName }}</div>
          <div class="text-xs text-surface-500 dark:text-surface-400">{{ userRoleText }}</div>
        </div>
      </div>
      <Button class="mt-4 w-full" label="Mon profil" icon="pi pi-user" severity="secondary" text @click="goProfile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Avatar from '@/components/ui/Avatar.vue';
import Button from '@/components/ui/Button.vue';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const mainMenu = [
  { label: 'Dashboard', icon: 'pi-home', to: '/dashboard' },
  { label: 'Documents', icon: 'pi-folder', to: '/documents' },
  { label: 'Importer', icon: 'pi-upload', to: '/upload' },
  { label: 'Recherche IA', icon: 'pi-search-plus', to: '/ai/explore' },
];

const adminMenu = [
  { label: "Logs d'Audit", icon: 'pi-list', to: '/admin/audit' },
  { label: 'Utilisateurs', icon: 'pi-users', to: '/admin/users' },
  { label: 'Paramètres', icon: 'pi-cog', to: '/admin/settings' },
  { label: 'Monitoring', icon: 'pi-chart-line', to: '/admin/monitoring' },
];

const isActive = (path: string) => route.path.startsWith(path);
const userName = computed(() => authStore.user?.name || 'Utilisateur');
const userInitials = computed(() => {
  const name = authStore.user?.name || 'AS';
  return name.split(' ').map((segment) => segment.charAt(0).toUpperCase()).slice(0, 2).join('');
});
const userRoleText = computed(() => authStore.user?.role ? authStore.user.role.charAt(0).toUpperCase() + authStore.user?.role.slice(1) : 'Invité');

const goProfile = () => router.push('/profile');
</script>

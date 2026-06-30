<template>
  <div class="mb-4">
    <nav class="shadow-sm rounded-xl bg-surface-0 dark:bg-surface-950 p-4">
      <ol class="flex items-center gap-2 text-sm text-surface-600">
        <li>
          <router-link to="/dashboard" class="flex items-center gap-1 text-primary"> 
            <i class="pi pi-home" />
            <span>Accueil</span>
          </router-link>
        </li>
        <li v-for="(crumb, idx) in breadcrumbs" :key="idx" class="before:content-['/'] before:px-2">
          <router-link :to="crumb.to" class="hover:underline">{{ crumb.label }}</router-link>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// Local breadcrumb implementation using router-link

const route = useRoute();

function humanizeSegment(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const breadcrumbs = computed(() => {
  const crumbs: any[] = [
    { label: 'Accueil', icon: 'pi pi-home', to: '/dashboard' }
  ];

  const segments = route.path.split('/').filter((segment) => segment !== '');
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    crumbs.push({
      label: humanizeSegment(segment),
      to: currentPath
    });
  });

  return crumbs;
});
</script>

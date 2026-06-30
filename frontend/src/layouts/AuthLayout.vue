<template>
  <div class="min-h-screen grid lg:grid-cols-[1.2fr_0.8fr] bg-surface-50 dark:bg-surface-900">
    <section class="hidden lg:flex items-center justify-center p-10 bg-gradient-to-br from-primary via-blue-600 to-slate-900 text-white overflow-hidden">
      <div class="max-w-xl space-y-8">
        <div class="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] shadow-sm">
          <i class="pi pi-rocket text-xl" /> Plateforme Documentaire Enterprise
        </div>
        <div class="space-y-4">
          <h1 class="text-5xl font-bold leading-tight">Sécurisez, cherchez, et exploitez vos archives avec une intelligence augmentée.</h1>
          <p class="text-lg text-white/80 leading-relaxed">ArchiveSafe combine OCR haute précision, résumés IA et recherche contextuelle pour transformer vos processus documentaires.</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-3xl bg-white/10 p-5 shadow-lg backdrop-blur-md border border-white/10">
            <p class="text-sm uppercase tracking-[0.18em] text-blue-200">Sécurité</p>
            <p class="mt-3 text-lg font-semibold">Chiffrement de bout en bout et gestion des accès.</p>
          </div>
          <div class="rounded-3xl bg-white/10 p-5 shadow-lg backdrop-blur-md border border-white/10">
            <p class="text-sm uppercase tracking-[0.18em] text-blue-200">Productivité</p>
            <p class="mt-3 text-lg font-semibold">Flux de travail optimisés pour des équipes exigeantes.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="flex items-center justify-center p-6 bg-surface-50 dark:bg-surface-900">
      <div class="w-full max-w-xl">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Auth layout with a premium side panel for larger screens
</script>

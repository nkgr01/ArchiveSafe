<template>
  <div class="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-0">
    <nav class="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center px-6 py-6 xl:px-10 border-b border-surface-200 dark:border-surface-800">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-3xl bg-primary flex items-center justify-center text-white text-lg font-bold">AS</div>
        <div>
          <div class="text-lg font-semibold">ArchiveSafe</div>
          <div class="text-sm text-surface-500 dark:text-surface-400">Gérez vos archives avec IA et conformité.</div>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <Button label="Connexion" text class="text-surface-700 dark:text-surface-100" @click="$router.push('/auth/login')" />
        <Button label="Inscription" severity="primary" class="shadow-lg" @click="$router.push('/auth/register')" />
      </div>
    </nav>

    <main class="px-6 py-10 xl:px-10">
      <section class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div class="space-y-8">
          <Tag value="Propulsé par Google Gemini AI" severity="info" class="w-fit bg-blue-100 text-blue-900" />

          <div class="space-y-6 max-w-2xl">
            <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">Transformez vos documents en informations sécurisées et exploitables.</h1>
            <p class="text-lg text-surface-600 dark:text-surface-400 leading-relaxed">ArchiveSafe centralise, analyse et rend vos archives immédiatement consultables grâce à l'OCR, la recherche contextuelle et les workflows adaptatifs.</p>

            <div class="flex flex-wrap gap-3">
              <Button label="Démarrer maintenant" icon="pi pi-rocket" severity="primary" size="large" @click="$router.push('/auth/register')" />
              <Button label="Voir la démo" icon="pi pi-eye" severity="secondary" size="large" text @click="$router.push('/auth/login')" />
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.5rem] border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
              <h3 class="font-semibold mb-3">OCR accéléré</h3>
              <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Extraction de texte instantanée pour ne plus perdre de temps à réécrire des documents.</p>
            </div>
            <div class="rounded-[1.5rem] border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 shadow-sm">
              <h3 class="font-semibold mb-3">Analyse intelligente</h3>
              <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Posez des questions à vos fichiers et obtenez des réponses fiables basées sur leur contenu.</p>
            </div>
          </div>
        </div>

        <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary to-blue-600 p-8 shadow-2xl text-white">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_55%)]" />
          <div class="relative grid gap-6">
            <div class="rounded-[1.75rem] bg-white/10 p-5 border border-white/15">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-3xl bg-white/20 flex items-center justify-center text-white text-xl">A</div>
                <div>
                  <span class="text-sm uppercase tracking-[0.2em]">Nouveau</span>
                  <p class="font-semibold text-xl mt-2">Résumé automatique</p>
                </div>
              </div>
            </div>
            <div class="rounded-[1.75rem] bg-white/10 p-5 border border-white/15">
              <h3 class="text-lg font-semibold mb-3">Tableau de bord unifié</h3>
              <p class="text-slate-100 text-sm leading-relaxed">Pilotage clair de l’activité, du statut OCR et des accès utilisateur.</p>
            </div>
            <div class="rounded-[1.75rem] border border-white/15 bg-white/10 p-5">
              <p class="text-sm uppercase tracking-[0.2em] text-blue-200">Sécurité</p>
              <p class="mt-4 text-lg font-semibold">Conforme RGPD et auditée</p>
            </div>
          </div>
        </div>
      </section>

      <section class="mt-16 rounded-[2rem] border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-950 p-8 shadow-sm">
        <div class="text-center mb-10">
          <p class="text-sm uppercase tracking-[0.22em] text-surface-500 dark:text-surface-400">Fonctionnalités clés</p>
          <h2 class="text-4xl font-bold text-surface-900 dark:text-surface-0 mt-3">Tout ce dont votre équipe a besoin</h2>
        </div>

        <div class="grid gap-6 lg:grid-cols-3">
          <div class="rounded-[1.5rem] bg-surface-50 dark:bg-surface-900 p-6 border border-surface-200 dark:border-surface-800 shadow-sm">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary text-white mb-4"><i class="pi pi-file-pdf"></i></div>
            <h3 class="text-xl font-semibold mb-2">OCR Professionnel</h3>
            <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Traitement de documents PDF, scans et images avec extraction de texte haute qualité.</p>
          </div>
          <div class="rounded-[1.5rem] bg-surface-50 dark:bg-surface-900 p-6 border border-surface-200 dark:border-surface-800 shadow-sm">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500 text-white mb-4"><i class="pi pi-brain"></i></div>
            <h3 class="text-xl font-semibold mb-2">Recherche intelligente</h3>
            <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Recherchez par mot-clé, contexte ou question naturelle dans toutes vos archives.</p>
          </div>
          <div class="rounded-[1.5rem] bg-surface-50 dark:bg-surface-900 p-6 border border-surface-200 dark:border-surface-800 shadow-sm">
            <div class="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-green-500 text-white mb-4"><i class="pi pi-shield"></i></div>
            <h3 class="text-xl font-semibold mb-2">Sécurité & conformité</h3>
            <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Contrôles d’accès, audit des actions et protection des données sensibles.</p>
          </div>
        </div>
      </section>

      <section class="mt-16 grid gap-6 lg:grid-cols-3">
        <div class="rounded-[1.75rem] bg-surface-50 dark:bg-surface-900 p-6 border border-surface-200 dark:border-surface-800 shadow-sm">
          <h3 class="text-lg font-semibold mb-3">Importer</h3>
          <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Téléversez vos PDF, documents Word ou scans en quelques clics.</p>
        </div>
        <div class="rounded-[1.75rem] bg-surface-50 dark:bg-surface-900 p-6 border border-surface-200 dark:border-surface-800 shadow-sm">
          <h3 class="text-lg font-semibold mb-3">Analyser</h3>
          <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Laissez l’OCR et l’IA extraire, résumer et taguer automatiquement vos contenus.</p>
        </div>
        <div class="rounded-[1.75rem] bg-surface-50 dark:bg-surface-900 p-6 border border-surface-200 dark:border-surface-800 shadow-sm">
          <h3 class="text-lg font-semibold mb-3">Accéder</h3>
          <p class="text-surface-500 dark:text-surface-400 leading-relaxed">Retrouvez instantanément vos informations avec une recherche intelligente.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/ui/Button.vue';
import Tag from '@/components/ui/Tag.vue';
</script>

<template>
  <div class="min-h-[calc(100vh-2rem)] flex items-center justify-center px-4 py-10 bg-surface-50 dark:bg-surface-900">
    <div class="grid w-full max-w-6xl rounded-[2rem] overflow-hidden shadow-2xl bg-white dark:bg-surface-950 border border-surface-200 dark:border-surface-800 lg:grid-cols-[1.05fr_0.95fr]">
      <section class="hidden lg:flex flex-col justify-center gap-8 bg-slate-900 p-12 text-white">
        <div class="space-y-4">
          <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.12em]">Rejoignez le flux documentaire sécurisé</span>
          <h1 class="text-4xl font-bold leading-tight">Une expérience utilisateur à la hauteur des plus grandes plateformes SaaS.</h1>
          <p class="text-base leading-relaxed text-slate-300">Créez votre espace ArchiveSafe, gérez vos documents avec un système de recherche intelligent et un contrôle d’accès fin pour les équipes.</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-[1.5rem] bg-white/10 p-5 border border-white/10 shadow-lg">
            <p class="text-xs uppercase tracking-[0.18em] text-blue-200 mb-2">Sécurité</p>
            <p class="text-lg font-semibold">Audit, permissions, et conformité.</p>
          </div>
          <div class="rounded-[1.5rem] bg-white/10 p-5 border border-white/10 shadow-lg">
            <p class="text-xs uppercase tracking-[0.18em] text-blue-200 mb-2">Performance</p>
            <p class="text-lg font-semibold">Chargement rapide et navigation fluide.</p>
          </div>
        </div>
      </section>

      <section class="p-8 sm:p-10">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-3xl bg-primary flex items-center justify-center text-white text-xl font-bold">AS</div>
            <div>
              <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">Créer un compte</h1>
              <p class="text-surface-500 dark:text-surface-400">Rejoignez la plateforme pour centraliser et exploiter vos archives.</p>
            </div>
          </div>
        </div>

        <div class="border-none shadow-xl rounded-[1.75rem] p-6 sm:p-8 bg-surface-50 dark:bg-surface-900">
          <form @submit.prevent="handleRegister" class="flex flex-col gap-6">
              <div class="grid gap-5 sm:grid-cols-2">
                <div class="flex flex-col gap-3">
                  <label for="name" class="font-semibold">Nom complet</label>
                  <input
                    id="name"
                    v-model="form.name"
                    placeholder="Jean Dupont"
                    class="rounded-2xl border px-4 py-3 text-surface-900 shadow-sm transition focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-surface-950 dark:text-surface-0"
                    :class="errors.name || v$.name.$error ? 'border-red-500' : 'border-slate-200'"
                  />
                  <small v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</small>
                  <small v-else-if="v$.name.$error" class="text-sm text-red-600">{{ v$.name.$errors[0].$message }}</small>
                </div>
                <div class="flex flex-col gap-3">
                  <label for="email" class="font-semibold">Adresse Email</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="nom@exemple.com"
                    class="rounded-2xl border px-4 py-3 text-surface-900 shadow-sm transition focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-surface-950 dark:text-surface-0"
                    :class="errors.email || v$.email.$error ? 'border-red-500' : 'border-slate-200'"
                  />
                  <small v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</small>
                  <small v-else-if="v$.email.$error" class="text-sm text-red-600">{{ v$.email.$errors[0].$message }}</small>
                </div>
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div class="flex flex-col gap-3">
                  <label for="password" class="font-semibold">Mot de passe</label>
                  <div class="relative">
                    <input
                      id="password"
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="w-full rounded-2xl border px-4 py-3 pr-12 text-surface-900 shadow-sm transition focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-surface-950 dark:text-surface-0"
                      :class="errors.password || v$.password.$error ? 'border-red-500' : 'border-slate-200'"
                    />
                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      @click="showPassword = !showPassword"
                      aria-label="Afficher ou masquer le mot de passe"
                    >
                      {{ showPassword ? 'Masquer' : 'Afficher' }}
                    </button>
                  </div>
                  <small v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</small>
                  <small v-else-if="v$.password.$error" class="text-sm text-red-600">{{ v$.password.$errors[0].$message }}</small>
                </div>
                <div class="flex flex-col gap-3">
                  <label for="password_confirmation" class="font-semibold">Confirmation</label>
                  <div class="relative">
                    <input
                      id="password_confirmation"
                      v-model="form.password_confirmation"
                      :type="showPassword ? 'text' : 'password'"
                      placeholder="••••••••"
                      class="w-full rounded-2xl border px-4 py-3 pr-12 text-surface-900 shadow-sm transition focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-surface-950 dark:text-surface-0"
                      :class="errors.password_confirmation || v$.password_confirmation.$error ? 'border-red-500' : 'border-slate-200'"
                    />
                    <button
                      type="button"
                      class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      @click="showPassword = !showPassword"
                      aria-label="Afficher ou masquer le mot de passe"
                    >
                      {{ showPassword ? 'Masquer' : 'Afficher' }}
                    </button>
                  </div>
                  <small v-if="errors.password_confirmation" class="text-sm text-red-600">{{ errors.password_confirmation }}</small>
                  <small v-else-if="v$.password_confirmation.$error" class="text-sm text-red-600">{{ v$.password_confirmation.$errors[0].$message }}</small>
                </div>
              </div>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                :disabled="loading"
              >
                <span v-if="loading">Création...</span>
                <span v-else>Créer mon compte</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';

const router = useRouter();
const authStore = useAuthStore();
const { success, error: notifyError } = useNotification();
const loading = ref(false);
const showPassword = ref(false);
const errors = reactive<Record<string, string>>({});

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const rules = {
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(8) },
  password_confirmation: { required, sameAs: sameAs(() => form.password) },
};

const v$ = useVuelidate(rules, form);

async function handleRegister() {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) return;

  loading.value = true;
  Object.keys(errors).forEach((key) => delete errors[key]);

  try {
    await authStore.register(form);
    success('Compte créé', 'Votre compte a été créé avec succès !');
    router.push('/dashboard');
  } catch (err: any) {
    if (err.response?.status === 422) {
      const validationErrors = err.response.data.errors;
      for (const key in validationErrors) {
        errors[key] = validationErrors[key][0];
      }
      notifyError('Erreur d\'inscription', 'Veuillez vérifier les informations saisies.');
    } else {
      notifyError('Erreur serveur', err.response?.data?.message || 'Une erreur inattendue est survenue.');
    }
  } finally {
    loading.value = false;
  }
}
</script>


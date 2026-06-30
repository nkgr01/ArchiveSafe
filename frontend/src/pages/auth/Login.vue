lut qwen<template>
  <div class="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-100">
    <div class="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid w-full gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="hidden rounded-[2rem] bg-gradient-to-br from-primary to-slate-950 p-12 text-white shadow-2xl lg:flex lg:flex-col lg:justify-between">
          <div class="space-y-8">
            <div class="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80 shadow-sm">ArchiveSafe Enterprise</div>
            <div class="space-y-6 max-w-xl">
              <h1 class="text-5xl font-bold leading-tight">Accédez à vos archives plus vite, plus intelligent.</h1>
              <p class="text-lg text-slate-200 leading-relaxed">Simplifiez la gestion documentaire avec une plateforme qui combine OCR haute précision, recherche contextuelle et sécurité des accès.</p>
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.5rem] bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.24em] text-slate-200">Analyse</p>
              <p class="mt-3 text-xl font-semibold">Résumé automatique</p>
            </div>
            <div class="rounded-[1.5rem] bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur-sm">
              <p class="text-xs uppercase tracking-[0.24em] text-slate-200">Sécurité</p>
              <p class="mt-3 text-xl font-semibold">Audit et conformité RGPD</p>
            </div>
          </div>
        </section>

        <section class="rounded-[2rem] bg-white dark:bg-surface-950 p-8 shadow-2xl ring-1 ring-surface-200 dark:ring-surface-800">
          <div class="mb-8">
            <div class="flex items-center gap-3">
              <div class="grid h-12 w-12 place-items-center rounded-3xl bg-primary text-white text-lg font-bold">AS</div>
              <div>
                <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">Connexion</h1>
                <p class="text-sm text-surface-500 dark:text-surface-400">Connectez-vous à votre espace sécurisé et reprenez le contrôle de vos documents.</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-3">
              <label for="email" class="block text-sm font-semibold">Adresse email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="nom@exemple.com"
                class="w-full rounded-2xl border border-surface-200 bg-white px-4 py-3 text-surface-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-surface-800 dark:bg-surface-950 dark:text-surface-100"
                :class="errors.email || v$.email.$error ? 'border-red-500' : ''"
              />
              <div class="min-h-[1.25rem] text-sm text-red-600">
                <span v-if="errors.email">{{ errors.email }}</span>
                <span v-else-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-semibold">Mot de passe</label>
                <router-link to="/auth/forgot-password" class="text-sm font-medium text-primary hover:underline">Mot de passe oublié ?</router-link>
              </div>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  class="w-full rounded-2xl border border-surface-200 bg-white px-4 py-3 pr-28 text-surface-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-surface-800 dark:bg-surface-950 dark:text-surface-100"
                  :class="errors.password || v$.password.$error ? 'border-red-500' : ''"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-sm font-medium text-surface-700 transition hover:bg-surface-100 dark:text-surface-200 dark:hover:bg-surface-800"
                  @click="showPassword = !showPassword"
                  aria-label="Afficher ou masquer le mot de passe"
                >
                  {{ showPassword ? 'Masquer' : 'Afficher' }}
                </button>
              </div>
              <div class="min-h-[1.25rem] text-sm text-red-600">
                <span v-if="errors.password">{{ errors.password }}</span>
                <span v-else-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
              </div>
            </div>

            <Button
              type="submit"
              class="w-full"
              label="Se connecter"
              severity="primary"
              :loading="loading"
            />
          </form>

          <div class="mt-6 border-t border-surface-200 pt-6 text-center text-sm text-surface-500 dark:border-surface-800 dark:text-surface-400">
            Pas encore de compte ?
            <router-link to="/auth/register" class="font-semibold text-primary hover:underline">Créer un compte</router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

const router = useRouter();
const authStore = useAuthStore();
const { success, error: notifyError } = useNotification();
const loading = ref(false);
const showPassword = ref(false);
const errors = reactive<Record<string, string>>({});

const form = reactive({
  email: '',
  password: '',
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, form);

async function handleLogin() {
  const isFormCorrect = await v$.$validate();
  if (!isFormCorrect) return;

  loading.value = true;
  Object.keys(errors).forEach((key) => delete errors[key]);

  try {
    await authStore.login(form);
    success('Connexion réussie', `Bienvenue ${authStore.user?.name || '!'}`);
    router.push('/dashboard');
  } catch (err: any) {
    if (err.response?.status === 422) {
      const validationErrors = err.response.data.errors;
      for (const key in validationErrors) {
        errors[key] = validationErrors[key][0];
      }
      notifyError('Erreur de validation', 'Veuillez vérifier vos informations.');
    } else {
      notifyError('Erreur de connexion', err.response?.data?.message || 'Une erreur inattendue est survenue.');
    }
  } finally {
    loading.value = false;
  }
}
</script>

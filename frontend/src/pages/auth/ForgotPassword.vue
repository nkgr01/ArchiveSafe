<template>
  <div class="min-h-[calc(100vh-2rem)] flex items-center justify-center px-4 py-10 bg-surface-50 dark:bg-surface-900">
    <div class="w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl bg-white dark:bg-surface-950 border border-surface-200 dark:border-surface-800">
      <div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-0">
        <section class="hidden lg:flex flex-col justify-center gap-6 px-10 py-12 bg-blue-700 text-white">
          <span class="text-sm uppercase tracking-[0.22em] text-blue-200">Réinitialisation du mot de passe</span>
          <h1 class="text-4xl font-bold">Nous allons vous aider à retrouver l'accès.</h1>
          <p class="text-base leading-relaxed text-blue-100">Entrez votre adresse email pour recevoir un lien de réinitialisation sécurisé.</p>
        </section>

        <section class="p-8 sm:p-10">
          <div class="mb-8">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-3xl bg-primary flex items-center justify-center text-white text-xl font-bold">AS</div>
              <div>
                <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0">Récupération de compte</h1>
                <p class="text-surface-500 dark:text-surface-400">Saisissez votre email pour envoyer le lien de réinitialisation.</p>
              </div>
            </div>
          </div>

          <div class="border-none shadow-xl rounded-[1.75rem] p-6 sm:p-8 bg-surface-50 dark:bg-surface-900">
            <form @submit.prevent="handleForgot" class="flex flex-col gap-5">
              <div class="flex flex-col gap-3">
                <label for="email" class="font-semibold">Adresse Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="nom@exemple.com"
                  class="rounded-2xl border px-4 py-3 text-surface-900 shadow-sm transition focus:ring-2 focus:ring-primary focus:outline-none bg-white dark:bg-surface-950 dark:text-surface-0"
                  :class="v$.email.$error ? 'border-red-500' : 'border-slate-200'"
                />
                <small v-if="v$.email.$error" class="text-sm text-red-600">{{ v$.email.$errors[0].$message }}</small>
              </div>

              <button
                type="submit"
                class="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                :disabled="loading"
              >
                <span v-if="loading">Envoi...</span>
                <span v-else>Envoyer le lien de réinitialisation</span>
              </button>
            </form>
          </div>

          <div class="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
            <router-link to="/auth/login" class="text-primary font-semibold hover:underline flex items-center justify-center gap-2">
              ← Retour à la connexion
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { AuthService } from '@/api/services/auth.service';
import { useNotification } from '@/composables/useNotification';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

const router = useRouter();
const { success, error: notifyError } = useNotification();
const loading = ref(false);

const form = reactive({
  email: '',
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, form);

async function handleForgot() {
  const isFormCorrect = await v$.value.$validate();

  if (!isFormCorrect) return;

  loading.value = true;
  try {
    if ('forgotPassword' in AuthService) {
      await (AuthService as any).forgotPassword(form.email);
    } else {
      throw new Error('Forgot password non disponible côté frontend');
    }
    success('Email envoyé', 'Un lien de réinitialisation a été envoyé à votre adresse email.');
    router.push('/auth/login');
  } catch (err: any) {
    notifyError('Erreur', err.response?.data?.message || 'Une erreur est survenue lors de la demande de récupération.');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Mon Profil</h1>
        <p class="text-surface-500">Gérez vos informations personnelles et vos préférences</p>
      </div>
    </div>

    <div class="grid">
      <!-- Profile Information -->
      <div class="col-12 lg:col-8">
        <Card>
          <template #title>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-user text-primary" />
              <span class="text-xl font-bold">Informations Personnelles</span>
            </div>
          </template>
          <template #content>
            <div class="grid">
              <div class="col-12 md:col-6 flex flex-column gap-2 mb-4">
                <label class="font-medium">Nom complet</label>
                <InputText v-model="profile.name" />
              </div>
              <div class="col-12 md:col-6 flex flex-column gap-2 mb-4">
                <label class="font-medium">Adresse Email</label>
                <InputText v-model="profile.email" disabled class="bg-surface-100 dark:bg-surface-800" />
              </div>
              <div class="col-12 md:col-6 flex flex-column gap-2 mb-4">
                <label class="font-medium">Téléphone</label>
                <InputText v-model="profile.phone" />
              </div>
              <div class="col-12 md:col-6 flex flex-column gap-2 mb-4">
                <label class="font-medium">Rôle</label>
                <span class="p-2 bg-surface-100 dark:bg-surface-800 border-round text-sm font-medium">
                  {{ profile.role }}
                </span>
              </div>
            </div>
            <Button label="Mettre à jour le profil" icon="pi pi-save" severity="primary" class="mt-4" @click="saveProfile" />
          </template>
        </Card>
      </div>

      <!-- Account Settings -->
      <div class="col-12 lg:col-4 flex flex-column gap-4">
        <Card>
          <template #title>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-lock text-primary" />
              <span class="text-xl font-bold">Sécurité</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-3">
              <Button label="Changer le mot de passe" icon="pi pi-key" severity="secondary" text class="w-full justify-content-start" />
              <Button label="Activer l'A2F" icon="pi pi-shield" severity="secondary" text class="w-full justify-content-start" />
            </div>
          </template>
        </Card>

        <Card>
          <template #title>
            <div class="flex align-items-center gap-2">
              <i class="pi pi-palette text-primary" />
              <span class="text-xl font-bold">Préférences</span>
            </div>
          </template>
          <template #content>
            <div class="flex flex-column gap-3">
              <div class="flex justify-content-between align-items-center">
                <span class="text-sm">Mode Sombre</span>
                <Toggleswitch v-model="preferences.darkMode" />
              </div>
              <div class="flex justify-content-between align-items-center">
                <span class="text-sm">Notifications Email</span>
                <Toggleswitch v-model="preferences.emailNotifications" />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/ui/Card.vue';
import InputText from '@/components/ui/InputText.vue';
import Button from '@/components/ui/Button.vue';
import Toggleswitch from '@/components/ui/ToggleSwitch.vue';

const profile = ref({
name: 'Rodrigue N GUESSAN',
  email: 'rodrigue@example.com',
  phone: '+225 00 00 00 00 00',
  role: 'Administrateur',
});

const preferences = ref({
  darkMode: true,
  emailNotifications: true,
});

function saveProfile() {
  console.log('Profil sauvegardé:', profile.value);
}
</script>

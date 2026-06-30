<template>
  <div class="flex flex-column gap-4">
    <!-- Page Header -->
    <div class="flex justify-content-between align-items-center">
      <div>
        <h1 class="text-3xl font-bold text-surface-900 dark:text-surface-0 m-0">Gestion des Utilisateurs</h1>
        <p class="text-surface-500">Contrôlez les accès et les rôles des membres de l'organisation</p>
      </div>
      <Button label="Nouvel Utilisateur" icon="pi pi-user-plus" severity="primary" @click="openCreateDialog" />
    </div>

    <Card>
      <template #content>
        <div v-if="adminStore.isLoading" class="flex justify-content-center py-5">
          <ProgressSpinner style="width: 50px; height: 50px" />
        </div>
        <DataTable v-else :value="adminStore.users" responsiveLayout="stack" :paginator="true" :rows="10" class="p-datatable-sm">
          <Column field="name" header="Utilisateur">
            <template #body="slotProps">
              <div class="flex align-items-center gap-2">
                <Avatar :label="slotProps.data.name.charAt(0)" shape="circle" />
                <span>{{ slotProps.data.name }}</span>
              </div>
            </template>
          </Column>
          <Column field="email" header="Email"></Column>
          <Column field="role" header="Rôle">
            <template #body="slotProps">
              <Tag :value="slotProps.data.role" :severity="slotProps.data.role === 'admin' ? 'success' : 'info'" />
            </template>
          </Column>
          <Column field="created_at" header="Date Création">
            <template #body="slotProps">
              {{ new Date(slotProps.data.created_at).toLocaleDateString() }}
            </template>
          </Column>
          <Column header="Actions" class="text-right">
            <template #body="slotProps">
              <div class="flex justify-content-end gap-1">
                <Button icon="pi pi-pencil" text rounded @click="editUser(slotProps.data)" />
                <Button icon="pi pi-trash" text rounded severity="danger" @click="deleteUser(slotProps.data)" />
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- User Edit/Create Dialog -->
    <Dialog v-model:visible="userDialog" modal header="Détails Utilisateur" :style="{ width: '450px' }">
      <div class="flex flex-column gap-4 py-3">
        <div class="flex flex-column gap-2">
          <label class="font-medium">Nom complet</label>
          <InputText v-model="selectedUser.name" />
        </div>
        <div class="flex flex-column gap-2">
          <label class="font-medium">Email</label>
          <InputText v-model="selectedUser.email" />
        </div>
        <div class="flex flex-column gap-2">
          <label class="font-medium">Rôle</label>
          <Dropdown v-model="selectedUser.role" :options="roles" />
        </div>
      </div>
      <template #footer>
        <Button label="Annuler" icon="pi pi-times" text @click="userDialog = false" />
        <Button label="Sauvegarder" icon="pi pi-check" severity="primary" @click="saveUser" />
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Card from '@/components/ui/Card.vue';
import DataTable from '@/components/ui/DataTable.vue';
import Column from '@/components/ui/Column.vue';
import Button from '@/components/ui/Button.vue';
import Avatar from '@/components/ui/Avatar.vue';
import Tag from '@/components/ui/Tag.vue';
import Dialog from '@/components/ui/Dialog.vue';
import InputText from '@/components/ui/InputText.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import ProgressSpinner from '@/components/ui/ProgressSpinner.vue';
import { useAdminStore } from '@/stores/admin';
import { useNotification } from '@/composables/useNotification';

const notify = useNotification();
const adminStore = useAdminStore();
const roles = ref(['user', 'admin']);
const userDialog = ref(false);
const selectedUser = ref({ id: undefined as number | undefined, name: '', email: '', role: 'user' as 'user' | 'admin' });

onMounted(() => {
  adminStore.fetchUsers();
});

function openCreateDialog() {
  selectedUser.value = { id: undefined, name: '', email: '', role: 'user' };
  userDialog.value = true;
}

function editUser(user: any) {
selectedUser.value = { ...user, role: (user?.role === 'admin' ? 'admin' : 'user') };
  userDialog.value = true;
}

async function saveUser() {
  try {
    if (selectedUser.value.id) {
if (selectedUser.value.id) {
      await adminStore.updateUser(selectedUser.value.id, selectedUser.value);
    }
      notify.success('Succès', 'Utilisateur mis à jour');
    } else {
      // La création n'est pas encore implémentée dans le UserController, 
      // on simule ou on ajoute l'endpoint plus tard
      notify.info('Info', "La création d'utilisateur est gérée via le seeding ou console");
    }
    userDialog.value = false;
  } catch (error: any) {
    notify.error('Erreur', error.response?.data?.message || 'Erreur lors de la sauvegarde');
  }
}

async function deleteUser(user: any) {
  if (confirm(`Êtes-vous sûr de vouloir supprimer ${user.name} ?`)) {
    try {
      await adminStore.deleteUser(user.id);
      notify.success('Succès', 'Utilisateur supprimé');
    } catch (error: any) {
      notify.error('Erreur', error.response?.data?.message || 'Erreur lors de la suppression');
    }
  }
}
</script>

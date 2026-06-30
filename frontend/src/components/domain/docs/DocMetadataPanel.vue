<template>
  <div class="flex flex-column h-full p-4 gap-4">
    <div class="flex justify-content-between items-center">
      <h3 class="text-xl font-bold m-0">Métadonnées</h3>
      <Button label="Enregistrer" icon="pi pi-check" severity="primary" size="small" @click="saveMetadata" />
    </div>

    <div class="flex flex-column gap-4 overflow-y-auto">
      <!-- Basic Info -->
      <div class="flex flex-column gap-2">
        <label class="text-sm font-medium">Nom du fichier</label>
        <InputText v-model="metadata.name" />
      </div>

      <div class="flex flex-column gap-2">
        <label class="text-sm font-medium">Catégorie</label>
        <Dropdown v-model="metadata.category" :options="categories" placeholder="Sélectionnez une catégorie" />
      </div>

      <div class="flex flex-column gap-2">
        <label class="text-sm font-medium">Date du document</label>
        <DatePicker v-model="metadata.date" showIcon />
      </div>

      <div class="flex flex-column gap-2">
        <label class="text-sm font-medium">Tags</label>
        <Chips v-model="metadata.tags" :options="availableTags" placeholder="Ajouter des tags..." />
      </div>

      <div class="flex flex-column gap-2">
        <label class="text-sm font-medium">Notes / Description</label>
        <Textarea v-model="metadata.description" rows="5" autoResize />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/ui/Button.vue';
import InputText from '@/components/ui/InputText.vue';
import Dropdown from '@/components/ui/Dropdown.vue';
import DatePicker from '@/components/ui/DatePicker.vue';
import Chips from '@/components/ui/Chips.vue';
import Textarea from '@/components/ui/Textarea.vue';

const metadata = ref({
  name: 'Facture_Orange_Juin.pdf',
  category: 'Facture',
  date: null,
  tags: ['Important', 'Telecom'],
  description: 'Facture mensuelle du service internet fibre.',
});

const categories = ref(['Facture', 'Contrat', 'Identité', 'Santé', 'Impôts']);
const availableTags = ref(['Urgent', 'A payer', 'Archivé', 'Important', 'Telecom']);

function saveMetadata() {
  console.log('Métadonnées sauvegardées:', metadata.value);
}
</script>

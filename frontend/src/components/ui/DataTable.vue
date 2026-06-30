<template>
  <div class="w-full overflow-x-auto">
    <div v-if="loading" class="py-8 text-center text-surface-500">Chargement...</div>
    <template v-else>
      <table class="min-w-full border-separate border-spacing-0 text-left text-sm text-surface-900 dark:text-surface-100">
        <thead>
          <tr class="border-b border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
            <th v-for="(column, index) in columns" :key="index" :style="column.props.headerStyle" class="px-4 py-3 font-semibold">
              <template v-if="column.slots.header">
                <SlotHeaderRenderer :column="column" />
              </template>
              <template v-else>{{ column.props.header }}</template>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in pageRows" :key="rowIndex" class="border-b border-surface-200 dark:border-surface-800 last:border-none hover:bg-surface-50 dark:hover:bg-surface-900">
            <td v-for="(column, colIndex) in columns" :key="colIndex" :class="column.props.class || 'px-4 py-4 align-top'">
              <template v-if="column.slots.body">
                <SlotBodyRenderer :column="column" :row="row" />
              </template>
              <template v-else>{{ accessField(row, column.props.field) }}</template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="paginator && totalPages > 1" class="mt-4 flex items-center justify-end gap-2">
        <button @click="prevPage" class="rounded-lg border border-surface-300 px-3 py-2 text-sm hover:bg-surface-100 dark:border-surface-700 dark:hover:bg-surface-800">Précédent</button>
        <span class="text-sm text-surface-500">Page {{ currentPage + 1 }} / {{ totalPages }}</span>
        <button @click="nextPage" class="rounded-lg border border-surface-300 px-3 py-2 text-sm hover:bg-surface-100 dark:border-surface-700 dark:hover:bg-surface-800">Suivant</button>
      </div>
      <div v-if="!pageRows.length" class="py-8 text-center text-surface-500">
        <slot name="empty" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, defineProps, provide, ref, type PropType } from 'vue';
const props = defineProps({
  value: { type: Array as PropType<any[]>, default: () => [] },
  loading: Boolean,
  paginator: Boolean,
  rows: { type: Number, default: 10 },
  totalRecords: Number,
});
const columns = ref<any[]>([]);
provide('DataTableContext', {
  registerColumn: (column: any) => columns.value.push(column),
});
const totalRecordsValue = computed(() => props.totalRecords ?? props.value.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalRecordsValue.value / props.rows)));
const currentPage = ref(0);
const pageRows = computed(() => {
  if (!props.value) return [];
  const start = currentPage.value * props.rows;
  return props.value.slice(start, start + props.rows);
});
const accessField = (row: any, field?: string) => {
  if (!field) return '';
  return field.split('.').reduce((acc: any, part: string) => acc?.[part], row) ?? '';
};
const SlotHeaderRenderer = defineComponent({
  name: 'SlotHeaderRenderer',
  props: { column: { type: Object as PropType<any>, required: true } },
  setup(props) {
    return () => props.column?.slots?.header?.() ?? null;
  },
});
const SlotBodyRenderer = defineComponent({
  name: 'SlotBodyRenderer',
  props: { column: { type: Object as PropType<any>, required: true }, row: { type: Object as PropType<any>, required: true } },
  setup(props) {
    return () => props.column?.slots?.body?.({ data: props.row }) ?? null;
  },
});
function prevPage() { if (currentPage.value > 0) currentPage.value -= 1; }
function nextPage() { if (currentPage.value < totalPages.value - 1) currentPage.value += 1; }
</script>

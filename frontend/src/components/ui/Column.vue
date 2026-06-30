<script setup lang="ts">
import { inject, onMounted, useSlots, type PropType } from 'vue';
const props = defineProps({
  field: String,
  header: String,
  selectionMode: String,
  sortable: Boolean,
  class: [String, Object] as PropType<string | Record<string, unknown>>,
  headerStyle: [Object, String] as PropType<Record<string, unknown> | string>,
});
const slots = useSlots();
const table = inject('DataTableContext') as any;
if (table && typeof table.registerColumn === 'function') {
  onMounted(() => {
    table.registerColumn({ props, slots });
  });
}
</script>

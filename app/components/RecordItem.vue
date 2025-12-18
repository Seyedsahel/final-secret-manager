<script setup lang="ts">
// RecordItem component
// - Displays a single record in the list and emits simple events
//   (`select`, `edit`, `delete`) so parent components can handle
//   navigation or API interactions. Keeps presentation and behavior
//   decoupled from network logic.
interface Record {
  id: number
  name: string
  content: string
}

defineProps<{
  record: Record
}>()

defineEmits<{
  select: [id: number]
  edit: [id: number]
  delete: [id: number]
}>()
</script>

<template>
  <div
    class="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-indigo-500 cursor-pointer transition-colors"
    @click="$emit('select', record.id)"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0 p-2">
        <h3 class="text-indigo-200">{{ record.name }}</h3>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click.stop="$emit('edit', record.id)"
          class="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg"
        >
          <span class="pi pi-pen-to-square"></span>
        </button>

        <button
          @click.stop="$emit('delete', record.id)"
          class="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg"
        >
          <span class="pi pi-trash"></span>
        </button>
      </div>
    </div>
  </div>
</template>

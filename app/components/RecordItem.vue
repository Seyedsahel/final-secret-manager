<script setup lang="ts">
// RecordItem component
// - Displays a single record in the list and emits simple events
//   (`select`, `edit`, `delete`) so parent components can handle
//   navigation or API interactions. Keeps presentation and behavior
//   decoupled from network logic.

import { computed } from 'vue'

interface Record {
  id: number
  name: string
  content: string
}

const props = defineProps<{
  record: Record
}>()

const displayName = computed(() => {
  const name = props.record.name
  return name.length > 15 ? name.slice(0, 15) + '...' : name
})



defineEmits<{
  select: [id: number]
  edit: [id: number]
  delete: [id: number]
}>()
</script>


<template>
  <div
    class="group bg-slate-900 border border-slate-800 rounded-lg hover:border-indigo-500/50 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 overflow-hidden"
    @click="$emit('select', record.id)"
  >
    <!-- Top colored accent bar -->
    <div class="h-1 bg-linear-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <div class="p-5">
      <!-- Icon and Name -->
      <div class="flex items-start gap-3 mb-4">
        <div class="shrink-0 w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
          <i class="pi pi-lock text-indigo-400 text-lg"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-slate-100 font-medium truncate group-hover:text-indigo-200 transition-colors" :title="record.name">
            {{ displayName }}
          </h3>
          <p class="text-slate-500 text-xs mt-1">Secret</p>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px bg-slate-800 group-hover:bg-slate-700 transition-colors mb-4"></div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-end gap-2">
        <button
          @click.stop="$emit('edit', record.id)"
          class="px-3 py-2 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all duration-200 flex items-center gap-2"
          title="Edit"
        >
          <i class="pi pi-pen-to-square text-sm"></i>
          <span class="text-xs">Edit</span>
        </button>

        <button
          @click.stop="$emit('delete', record.id)"
          class="px-3 py-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-all duration-200 flex items-center gap-2"
          title="Delete"
        >
          <i class="pi pi-trash text-sm"></i>
          <span class="text-xs">Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>
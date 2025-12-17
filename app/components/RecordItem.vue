<script setup lang="ts">
      interface Record {
        id: number;
        name: string;
        content: string;
      }
      
      interface Props {
        record: Record;
      }
      
      defineProps<Props>();
      
      defineEmits<{
        edit: [id: number];
        delete: [id: number];
      }>();
</script>
<template>
  <div class="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0 p-2">
        <h3 class="text-indigo-200">{{ record.name }}</h3>
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="$emit('edit', record.id)"
          class="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <span class="pi pi-pen-to-square text-indigo-200"></span>
        </button>
        <button
          @click="$emit('delete', record.id)"
          class="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
        >
            <span class="pi pi-trash text-indigo-200"></span>
        </button>
      </div>
    </div>
  </div>
</template>

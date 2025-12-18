<script setup lang="ts">
import { reactive } from 'vue'

interface NewRecord {
  name: string
  content: string
}

const emit = defineEmits<{
  submit: [record: NewRecord]
  close: []
}>()

const record = reactive<NewRecord>({
  name: '',
  content: ''
})
const recordError = reactive({
  name: '',
  content: ''
})

const submit = () => {
    recordError.name = ""
    recordError.content = ""
    if (!record.name) {
        recordError.name = "Name is requaierd!"   
    } if(!record.content) {
        recordError.content = "Content is requaierd!"   
    } else{
        emit('submit', { ...record })
    }
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
      
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-slate-100">Add New Secret</h2>
        <button
          @click="close"
          class="text-slate-400 hover:text-slate-200"
        >
          ✕
        </button>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-slate-200 mb-2">Name</label>
          <input
            v-model="record.name"
            type="text"
            class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100"
          />
          <p class="text-red-600">{{ recordError.name }}</p>
        </div>

        <div>
          <label class="block text-slate-200 mb-2">Content</label>
          <textarea
            v-model="record.content"
            rows="3"
            class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 resize-none"
          />
          <p class="text-red-600">{{ recordError.content }}</p>
        </div>

        <div class="flex gap-3 pt-2">
          <button
            @click="close"
            class="flex-1 bg-slate-800 text-slate-200 py-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            @click="submit"
            class="flex-1 bg-indigo-600 text-white py-3 rounded-lg"
          >
            Add Record
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

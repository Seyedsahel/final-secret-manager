<script setup lang="ts">
// AddRecordModal component
// - Small modal UI used to create or edit a secret/record.
// - Validates presence of `name` and `content` before emitting `submit`.
// - Purely presentational and emits events; does not perform network calls.
import { reactive, watch } from 'vue'

interface RecordPayload {
  name: string
  content: string
}

const props = defineProps<{
  mode: 'add' | 'edit'
  initialRecord?: RecordPayload
}>()

const emit = defineEmits<{
  submit: [record: RecordPayload]
  close: []
}>()

const record = reactive<RecordPayload>({
  name: '',
  content: ''
})

const recordError = reactive({
  name: '',
  content: ''
})

// if in edit mode, set inital values
watch(
  () => props.initialRecord,
  (value) => {
    if (value) {
      record.name = value.name
      record.content = value.content
    }
  },
  { immediate: true }
)

const submit = () => {
  recordError.name = ''
  recordError.content = ''

  if (!record.name) {
    recordError.name = 'Name is required'
  }

  if (!record.content) {
    recordError.content = 'Content is required'
  }

  if (recordError.name || recordError.content) return

  emit('submit', { ...record })
}

const close = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
    <div class="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-slate-100">
          {{ props.mode === 'add' ? 'Add New Secret' : 'Edit Secret' }}
        </h2>
        <button @click="close" class="text-slate-400 hover:text-slate-200">
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
          <button @click="close" class="flex-1 bg-slate-800 text-slate-200 py-3 rounded-lg">
            Cancel
          </button>
          <button @click="submit" class="flex-1 bg-indigo-600 text-white py-3 rounded-lg">
            {{ props.mode === 'add' ? 'Add Record' : 'Save Changes' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

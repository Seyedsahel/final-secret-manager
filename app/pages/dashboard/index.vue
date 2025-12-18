<script setup lang="ts">
  // Dashboard index
  // - Shows the list of records (secrets) and provides actions to
  //   add, edit or delete records. This page delegates network
  //   operations to the `record` store and reacts to its loading/error
  //   state. UI logic like opening modals is handled here.
  import { ref , onMounted , watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useRecordStore } from '@/stores/record';
    import { useAuthStore } from '@/stores/auth';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    

    // fetch data(secrets list)
    const recordStore = useRecordStore()
    const authStore = useAuthStore()
    const router = useRouter()

    onMounted(async () => {
      await recordStore.fetchRecords()
    })

    watch(
      () => recordStore.error,
      (error) => {
        if (error === 'Unauthorized') {
          authStore.isAuthenticated = false
          router.push('/login')
          
        }
      }
    )


    const handleSelectRecord = (id: number) => {
        router.push(`/dashboard/${id}`)
    };

    const showRecordModal = ref(false)
    const modalMode = ref<'add' | 'edit'>('add')
    const selectedRecord = ref<
    {   id:number;
        name: string;
        content: string}
     | undefined>(undefined)


    const handleAddClick = () => {
        modalMode.value = 'add'
        selectedRecord.value = undefined
        showRecordModal.value = true
    }
    const handleEditRecord = (id: number) => {
        const record = recordStore.records.find(r => r.id === id)
        if (!record) return

        modalMode.value = 'edit'
        selectedRecord.value = {
            id: record.id,
            name: record.name,
            content: record.content
        }
        showRecordModal.value = true
    }

    const handleSubmitRecord = async (payload: { name: string; content: string }) => {
        let success = false

        if (modalMode.value === 'add') {
            success = await recordStore.addRecord(payload.name, payload.content)
        } else if (modalMode.value === 'edit' && selectedRecord.value) {
            success = await recordStore.updateRecord(
            selectedRecord.value.id,
            payload.name,
            payload.content
            )
        }

        if (success) {
          if (modalMode.value === 'add') {
            toast.success('Secret Added Successfully!');
          } else if (modalMode.value === 'edit') {
            toast.success('Secret Updated Successfully!');
          }  
            showRecordModal.value = false
        }
    }

    const showDeleteModal = ref(false)
    const handleAskDeleteRecord = (id: number) => {
      const record = recordStore.records.find(r => r.id === id)
      if (!record) return

      recordStore.currentRecord = record
      showDeleteModal.value = true
    }


    const handleDeleteRecord = async () => {
      const record = recordStore.currentRecord
      if (!record) return

      const success = await recordStore.deleteRecord(record.id)
      if (success) {
        toast.warning('Record deleted successfully')
        showDeleteModal.value = false
      }
    }

</script>
<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 md:px-10 py-6">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-slate-100 text-3xl mb-2">Your Secrets</h1>
        <p class="text-slate-400">Manage your encrypted secrets securely</p>
      </div>

      <!-- Records List -->
      <div>
        <div v-if="recordStore.loading" class="rounded-lg p-8 text-center">
          <p class="text-slate-400 text-2xl md:text-5xl my-10 md:my-20">Loading Secrets...</p>
          <i class="pi pi-spin pi-spinner text-4xl md:text-7xl text-indigo-400"></i>
        </div>
        
        <div v-else>
          <!-- Empty State -->
          <div v-if="recordStore.records.length === 0" class="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
            <div class="max-w-sm mx-auto">
              <div class="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="pi pi-lock text-slate-600 text-2xl"></i>
              </div>
              <h3 class="text-slate-300 text-lg mb-2">No secrets yet</h3>
              <p class="text-slate-500 text-sm mb-6">Get started by creating your first secret</p>
              <button
                @click="handleAddClick"
                class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <i class="pi pi-plus"></i>
                <span>Create Secret</span>
              </button>
            </div>
          </div>
          
          <!-- Records Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <RecordItem 
              v-for="record in recordStore.records" 
              :key="record.id" 
              :record="record"
              @select="handleSelectRecord"
              @edit="handleEditRecord"
              @delete="handleAskDeleteRecord"
            />
          </div>
        </div>   
      </div>
    </main>

    <!-- Floating Add Button -->
    <button
      @click="handleAddClick"
      class="fixed bottom-8 right-8 w-16 h-16 bg-linear-to-br from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-full shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group z-50"
      title="Add Secret"
    >
      <i class="pi pi-plus text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
      <!-- Animated glow ring -->
      <span class="absolute inset-0 rounded-full bg-indigo-500 blur-md opacity-40 group-hover:opacity-60 transition-opacity"></span>
    </button>


    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
        <div class="mb-6">
          <h2 class="text-slate-100 mb-2">Delete Secret</h2>
          <p class="text-slate-400 text-sm">
            Are you sure you want to delete "{{ recordStore.currentRecord?.name }}"? This action cannot be undone.
          </p>
        </div>

        <div class="flex gap-3">
          <button
            @click="showDeleteModal = false"
            class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleDeleteRecord"
            class="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Add/Edit Record Modal -->
    <AddRecordModal
      v-if="showRecordModal"
      :mode="modalMode"
      :initial-record="selectedRecord"
      @submit="handleSubmitRecord"
      @close="showRecordModal = false"
    />
  </div>
</template>
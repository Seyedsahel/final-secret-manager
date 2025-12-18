<script setup lang="ts">
    import { ref , onMounted , watch } from 'vue';
    import { useRouter } from 'vue-router';
    import { useRecordStore } from '@/stores/record';
    import { useAuthStore } from '@/stores/auth';
    import { useToast } from 'vue-toastification';

    const toast = useToast();
    const showDeleteModal = ref(false);

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
            toast.success('Successfull!');
            showRecordModal.value = false
        }
    }



    const handleDeleteRecord = async (id: number) => {
        const success = await recordStore.deleteRecord(id)
        if (success) {
          toast.warning('Record deleted successfully')
        }
    };
</script>

<template>
  <div>
    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-10 py-6">
      <!-- Records List -->
      <div>
        <div v-if="recordStore.loading" class="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <p class="text-slate-400">Loading Secrets...</p>
        </div>
        <div v-else>
          <div v-if="recordStore.records.length === 0" class="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <p class="text-slate-400">No records found</p>
        </div>
        <div v-else class="space-y-3">
          <RecordItem 
            v-for="record in recordStore.records" 
            :key="record.id" 
            :record="record"
            @select="handleSelectRecord"
            @edit="handleEditRecord"
            @delete="handleDeleteRecord"
          />
        </div>
        </div>   
      </div>
    </main>

    <!-- Floating Add Button -->
    <button
      @click="showRecordModal = true"
      class="fixed bottom-6 left-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
    >
      <span class="pi pi-plus text-xl"></span>
    </button>

    <!-- Add Record Modal -->
    <AddRecordModal
        v-if="showRecordModal"
        :mode="modalMode"
        :initial-record="selectedRecord"
        @submit="handleSubmitRecord"
        @close="showRecordModal = false"
    />
   

  </div>
</template>

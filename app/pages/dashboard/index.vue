<script setup lang="ts">
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


    const showAddModal = ref(false);
 
    const handleAddRecord = async (record:{name:string; content: string}) => {
      const success = await recordStore.addRecord(record.name, record.content)
      if (success) {
        toast.success('Login successful!');
        showAddModal.value = false
      }
       
    };
    
    const handleSelectRecord = (id: number) => {
        router.push(`/dashboard/${id}`)
    };

    const handleEditRecord = (id: number) => {
        console.log('Edit record:', id);
        // Implement edit functionality
    };

    const handleDeleteRecord = (id: number) => {
        console.log('Delet record:', id);
        // Implement edit functionality
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
      @click="showAddModal = true"
      class="fixed bottom-6 left-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
    >
      <span class="pi pi-plus text-xl"></span>
    </button>

    <!-- Add Record Modal -->
    <AddRecordModel
      v-if="showAddModal"
      @close="showAddModal=false"
      @submit="handleAddRecord"
    />
  </div>
</template>

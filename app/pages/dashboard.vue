
<script setup lang="ts">
    import { ref } from 'vue';

        interface Record {
            id: number;
            name: string;
            content: string;
            }

    const records = ref<Record[]>([
        {
        id: 1,
        name: 'Website Redesign',
        content: 'Complete redesign of the company website with new branding',
        },
        {
        id: 2,
        name: 'Mobile App Development',
        content: 'Build iOS and Android applications for customer portal',  
        },
        {
        id: 3,
        name: 'Database Migration',
        content: 'Migrate from MySQL to PostgreSQL for better performance',
        },
        {
        id: 4,
        name: 'API Integration',
        content: 'Integrate third-party payment gateway API',
        }
    ]);

    const showAddModal = ref(false);
    const newRecord = ref({
        name: '',
        content: '',
    });

    const handleAddRecord = () => {
        if (newRecord.value.name && newRecord.value.content) {
        const record: Record = {
            id: Date.now(),
            name: newRecord.value.name,
            content: newRecord.value.content,
        };
        records.value = [record, ...records.value];
        newRecord.value = { name: '', content: '' };
        showAddModal.value = false;
        }
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
  <div class="min-h-screen bg-slate-950">

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-10 py-6">
      <!-- Records List -->
      <div class="space-y-3">
        <div v-if="records.length === 0" class="bg-slate-900 border border-slate-800 rounded-lg p-8 text-center">
          <p class="text-slate-400">No records found</p>
        </div>
        <RecordItem 
          v-else
          v-for="record in records" 
          :key="record.id" 
          :record="record"
          @edit="handleEditRecord"
          @delete="handleDeleteRecord"
        />
      </div>
    </main>

    <!-- Floating Add Button -->
    <button
      @click="showAddModal = true"
      class="fixed bottom-6 left-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </button>

    <!-- Add Record Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div class="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-slate-100">Add New Secret</h2>
          <button
            @click="showAddModal = false"
            class="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-slate-200 mb-2">Name</label>
            <input
              type="text"
              v-model="newRecord.name"
              placeholder="Enter Name"
              class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-slate-200 mb-2">Content</label>
            <textarea
              v-model="newRecord.content"
              placeholder="Enter content"
              rows="3"
              class="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
          </div>


          <div class="flex gap-3 pt-2">
            <button
              @click="showAddModal = false"
              class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              @click="handleAddRecord"
              class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition-colors"
            >
              Add Record
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

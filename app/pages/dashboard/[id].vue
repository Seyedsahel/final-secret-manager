<script setup lang="ts">
  // Record detail page
  // - Displays a single secret's content and metadata.
  // - Uses the `record` store to load the current record by id and
  //   handles copy/edit/delete UI actions. Error handling redirects
  //   the user when the record is missing or unauthorized.
  import { onMounted, watch } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useRecordStore } from '@/stores/record'
    import { useAuthStore } from '@/stores/auth'
    import { ref } from 'vue'
    import { useToast } from 'vue-toastification';
   
    const toast = useToast();


    const route = useRoute()
    const router = useRouter()

    const recordStore = useRecordStore()
    const authStore = useAuthStore()

    const recordId = Number(route.params.id)

    onMounted(async () =>{
        if(isNaN(recordId)){
            router.push('/dashboard')
            return
        }
        await recordStore.selectRecordNyId(recordId)
    })

    // error handling
    watch(
        () => recordStore.error,
        (error) => {
            if (!error) return

            if (error === 'Unauthorized') {
            authStore.isAuthenticated = false
            router.push('/login')
            }

            if (error === 'Not Found') {
            router.push('/dashboard')
            }
        }
        )

    onUnmounted(() => {
        recordStore.clearCurrentRecord()
    })


    const showContent = ref(false);
    const copied = ref(false);
    const showDeleteModal = ref(false);

    const handleCopy = async () => {
    const content = recordStore.currentRecord?.content

    if (!content) return

    await navigator.clipboard.writeText(content)

    copied.value = true
    setTimeout(() => {
        copied.value = false
    }, 2000)
    }


    const showRecordModal = ref(false)
    const modalMode = ref<'add' | 'edit'>('add')
    const selectedRecord = ref<
    { id: number; name: string; content: string } | undefined
    >(undefined)

    const handleDelete = async() => {
      if(!recordStore.currentRecord)return
      const success = await recordStore.deleteRecord(recordStore.currentRecord.id)
      if (success) {
        toast.warning('Record deleted successfully')
        showDeleteModal.value = false
        router.push('/dashboard')
      }
    };

    const handleEdit = () => {
    if (!recordStore.currentRecord) return

    modalMode.value = 'edit'
    selectedRecord.value = {
        id: recordStore.currentRecord.id,
        name: recordStore.currentRecord.name,
        content: recordStore.currentRecord.content
    }
    showRecordModal.value = true
    }

    const handleSubmitRecord = async (payload: { name: string; content: string }) => {
        if (!selectedRecord.value) return

        const success = await recordStore.updateRecord(
            selectedRecord.value.id,
            payload.name,
            payload.content
        )

        if (success) {
            toast.success('Successfull!');
            showRecordModal.value = false
        }
    }




</script>
<template>
  <div class="min-h-screen bg-slate-950">
    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-6">
      <div class="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <!-- Main Split Container -->
        <div class="flex flex-col lg:flex-row">
          <!-- Left Side - 30% -->
          <div class="w-full lg:w-[30%] p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col">
            <!-- Top: Name and Secret ID -->
            <div class="flex-1 space-y-6">
              <div>
                <label class="block text-slate-400 text-sm mb-2">Name</label>
                <h2 class="text-slate-100 text-xl wrap-break-words">{{ recordStore.currentRecord?.name }}</h2>
              </div>
              
              <div>
                <label class="block text-slate-400 text-sm mb-2">Secret ID</label>
                <p class="text-slate-300 text-sm font-mono break-all">{{ recordStore.currentRecord?.id }}</p>
              </div>
               <!-- User ID -->
            <div>
              <label class="block text-slate-400 text-sm mb-2">User ID</label>
              <p class="text-slate-300 text-sm font-mono break-all">{{ recordStore.currentRecord?.user_id }}</p>
            </div>
            </div>

            <!-- Bottom: Edit and Delete Buttons -->
            <div class="flex gap-3 mt-6">
              <button
                @click="handleEdit"
                class="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                <i class="pi pi-pencil"></i>
                <span>Edit</span>
              </button>
              <button
                @click="showDeleteModal = true"
                class="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-red-900/50 text-slate-200 hover:text-red-400 rounded-lg transition-colors"
              >
                <i class="pi pi-trash"></i>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <!-- Right Side - 70% -->
          <div class="w-full lg:w-[70%] p-6 flex flex-col">
            <!-- Content Box -->
            <div>
              <label class="block text-slate-400 text-sm mb-2">Content</label>
              <div class="bg-slate-950 border border-slate-700 rounded-lg p-4 min-h-50">
                <div class="flex-1 min-w-0">
                  <p v-if="showContent" class="text-slate-100 font-mono text-sm break-all">
                    {{ recordStore.currentRecord?.content }}
                  </p>
                  <p v-else class="text-slate-500 font-mono text-sm">
                    {{ '•'.repeat(30) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Show and Copy Buttons Below Content -->
            <div class="flex gap-3 mt-4">
              <button
                @click="showContent = !showContent"
                class="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
              >
                <i :class="showContent ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                <span>{{ showContent ? 'Hide' : 'Show' }}</span>
              </button>
              <button
                @click="handleCopy"
                :disabled="!recordStore.currentRecord?.content"
                class="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i :class="copied ? 'pi pi-check text-emerald-400' : 'pi pi-copy'"></i>
                <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
              </button>
            </div>

           
          </div>
        </div>
      </div>

      <!-- Warning Message -->
      <div class="mt-6 bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
        <p class="text-amber-400 text-sm">
          ⚠️ Keep your secrets secure. Never share them in public repositories or unsecured channels.
        </p>
      </div>
    </main>

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
            @click="handleDelete"
            class="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <AddRecordModal
      v-if="showRecordModal"
      :mode="modalMode"
      :initial-record="selectedRecord"
      @submit="handleSubmitRecord"
      @close="showRecordModal = false"
    />
  </div>
</template>
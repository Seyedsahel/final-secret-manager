<script setup lang="ts">
    import logo from '@/assets/img/logo.png';
    import { useToast } from 'vue-toastification';
    import { useAuthStore } from '@/stores/auth';
    import { useRecordStore } from '@/stores/record';
    import { ref, onMounted , watch } from 'vue';

    // because wa do not have a token validat from backend:
    const recordStore = useRecordStore()
    let isAuthForHeader = ref(false)

    onMounted(async () => {
      await recordStore.fetchRecords()
      isAuthForHeader.value = true;
    })

    watch(
      () => recordStore.error,
      (error) => {
        if (error === 'Unauthorized') {
          isAuthForHeader.value = false
          
        }
      }
    )


    const toast = useToast();
    const auth = useAuthStore();

    async function logout(){
        const logoutResult = await auth.logout();
        if (logoutResult) {
            toast.warning('Logged out successfully');
            navigateTo('/login');
        }
    }


</script>

<template>
    <nav class="p-4 px-16">
        <div class="container mx-auto flex justify-between items-center mb-5">
            <div class="flex items-center">
                <img :src="logo" alt="Logo" class="h-8 mr-2" />
                <NuxtLink to="/dashboard" class="text-white text-lg font-semibold">Secret Management</NuxtLink>
            </div>
            <div>
                <div v-if="!isAuthForHeader" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                    <NuxtLink to="/login" class="font-bold" >
                   <i class="pi pi-sign-in text-white mr-2.5 "></i> Login
                </NuxtLink>
                </div>
                 <div v-if="isAuthForHeader"  @click="logout()" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer font-bold">
                   <i class="pi pi-sign-out text-white mr-2.5 "></i> Logout
                </div>
               
            </div>
        </div>
        <div class="w-full h-px bg-gray-600 m-1"></div>
    </nav>
</template>
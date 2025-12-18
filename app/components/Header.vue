<script setup lang="ts">
    import logo from '@/assets/img/logo.png';
    import { useToast } from 'vue-toastification';
    import { useAuthStore } from '@/stores/auth';
    import { useRecordStore } from '@/stores/record';
    import { ref , onMounted } from 'vue';
        // Header component
        // - Renders site navigation and shows Login/Register or Logout
        //   depending on authentication state provided by the auth store.
        // - Uses a lightweight probe (recordStore.fetchRecords) to infer
        //   whether the backend session is valid. 




    // because we do not have a token validation from backend:
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
    <nav class="p-4 px-8 md:px-16">
        <div class="container mx-auto flex justify-between items-center mb-5">
             <!-- Logo & Brand -->
                <div class="flex items-center space-x-3 group">
                    <div class="relative md:mr-6 ">
                        <div class="absolute inset-0 bg-indigo-500 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                        <img :src="logo" alt="Logo" class="h-10 relative z-10" />
                    </div>
                    <NuxtLink 
                        to="/dashboard" 
                        class="text-slate-100 text md:text-xl font-semibold hover:text-indigo-400 transition-colors"
                    >
                        Secret Manager
                    </NuxtLink>
                </div>
            <div>
               <NuxtLink 
                        v-if="!isAuthForHeader"
                        to="/login"
                        class="inline-flex items-center md:gap-2 bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white md:px-5 px-3 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105"
                    >
                        <i class="pi pi-sign-in"></i>
                        <span class="hidden sm:inline">Login</span>
                    </NuxtLink>
                    <NuxtLink 
                        v-if="isAuthForHeader"
                        @click="logout"
                        to="/login"
                        class="inline-flex items-center md:gap-2 bg-linear-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white md:px-5 px-3 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-indigo-500/50 hover:scale-105"
                    >
                        <i class="pi pi-sign-out"></i>
                        <span class="hidden sm:inline">Logout</span>
                    </NuxtLink>
               
            </div>
        </div>
        <div class="w-full h-px bg-gray-600 m-1"></div>
    </nav>
</template>
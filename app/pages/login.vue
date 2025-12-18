<script setup lang="ts">
    
  import { ref } from 'vue';
  import { useToast } from 'vue-toastification';
  import { useAuthStore } from '@/stores/auth';

  const toast = useToast();
  const auth = useAuthStore();


  

  const username = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const errors = ref<{ [key: string]: string }>({});
  const serverErrorMessage = ref('');
  const loading = ref(false);


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!username.value) {
      newErrors.username = 'Username is required';
    } else if (username.value.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }

    if (!password.value) {
      newErrors.password = 'Password is required';
    } else if (password.value.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  };


  async function login(){
    loading.value = true;
    serverErrorMessage.value = "";
    const success = await auth.login(username.value, password.value);
    if (success) {
        toast.success('Login successful!');
        navigateTo('/');
    } else{
        serverErrorMessage.value = auth.error || '';
        loading.value = false;
    }
  }
    
   const handleSubmit = () => {
    if (validateForm()) {
      login();
    }
  };
</script>


<template>
  <div class="flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-full mb-4">
          <span class="pi pi-user text-indigo-400 text-3xl"></span>
        </div>
        <h1 class="text-indigo-400 mb-2 text-2xl">Login to Your Account</h1>
      </div>
      <div v-if="serverErrorMessage" class="text-red-500 text-lg text-center border border-red-500 rounded p-2.5 m-5">
        <p>{{ serverErrorMessage}}, Please Try Again!</p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-5">
       
        <!-- Username Input -->
        <div>
          <label for="username" class="block text-slate-200 mb-2">
            Username
          </label>
          <div class="relative">
            <input
              id="username"
              type="text"
              v-model="username"
              :class="[
                'w-full bg-slate-900 border rounded-lg px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                errors.username ? 'border-red-500' : 'border-slate-700'
              ]"
              placeholder="Enter your username"
            />
            <span v-if="username.length > 3" class="pi pi-check-circle absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 text-2xl"></span>
          </div>
          <p v-if="errors.username" class="text-red-400 text-sm mt-1">
            {{ errors.username }}
          </p>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-slate-200 mb-2">
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              :class="[
                'w-full bg-slate-900 border rounded-lg px-4 py-3 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
                errors.password ? 'border-red-500' : 'border-slate-700'
              ]"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <span v-if="showPassword" class="pi pi-eye text-lg" ></span>
              <span v-else class="pi pi-eye-slash text-lg" ></span>
            </button>
          </div>
          <p v-if="errors.password" class="text-red-400 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>
        <!-- Submit Button -->
        <button
          type="submit"
          class="flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg transition-colors"
            :disabled="loading"
        >
            <i v-if="loading" class="pi pi-spin pi-spinner mr-2 text-2xl"></i>
            
              Login
        </button>
      </form>

      <div class="text-center mt-6">
        <p class="text-slate-400">
          do not have an account?
          <NuxtLink to="/register" class="text-indigo-400 hover:text-indigo-300 hover:underline">
                Sign up
          </NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

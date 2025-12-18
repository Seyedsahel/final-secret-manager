<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const router = useRouter()

const goHome = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center px-6">
    <div class="max-w-md w-full text-center bg-slate-900 border border-slate-800 rounded-xl p-8">

      <h1 class="text-6xl font-bold text-indigo-500 mb-4">
        {{ error.statusCode || 500 }}
      </h1>

      <p class="text-slate-300 text-lg mb-2">
        {{ error.statusMessage || 'Something went wrong' }}
      </p>

      <p class="text-slate-500 text-sm mb-6">
        The page you are looking for doesn’t exist or an error occurred.
      </p>

      <div class="flex gap-3">
        <button
          @click="router.back()"
          class="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-lg"
        >
          Go Back
        </button>

        <button
          @click="goHome"
          class="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg"
        >
          Dashboard
        </button>
      </div>

    </div>
  </div>
</template>

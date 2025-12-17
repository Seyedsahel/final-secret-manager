  <script setup>
    import { useAuthStore } from '@/stores/auth';
    const auth = useAuthStore();
    definePageMeta({
        middleware: ['auth','un-auth']
    })
  console.log("ligin?",auth.isAuthenticated)
  </script>
<template>
    index page
</template>

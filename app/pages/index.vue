  <script setup>
    // Index page
    // - Minimal entry point. It uses the auth store to determine
    //   authentication state and applies middleware. Keep this file
    //   small; most UI should live in dedicated pages/components.
    import { useAuthStore } from '@/stores/auth';
    const auth = useAuthStore();
    definePageMeta({
        middleware: ['auth','un-auth']
    })
  console.log("ligin?",auth.isAuthenticated)
  </script>
<template>
   
</template>

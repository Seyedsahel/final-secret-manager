<template>
    index page
</template>

<script setup>
  import { useAuthStore } from '@/stores/auth';
  const auth = useAuthStore();
console.log("ligin?",auth.isAuthenticated)
</script>
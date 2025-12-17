<script setup>
    import logo from '@/assets/img/logo.png';
</script>

<template>
    <nav class="p-4 px-16">
        <div class="container mx-auto flex justify-between items-center mb-5">
            <div class="flex items-center">
                <img :src="logo" alt="Logo" class="h-8 mr-2" />
                <NuxtLink to="/" class="text-white text-lg font-semibold">Secret Management</NuxtLink>
            </div>
            <div>

                <NuxtLink to="/login" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                    Login
                </NuxtLink>
                <NuxtLink to="/" class="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
                    Logout
                </NuxtLink>
            </div>
        </div>
        <div class="w-full h-px bg-gray-600 m-1"></div>
    </nav>
</template>
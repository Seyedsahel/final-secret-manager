<script setup>
    import logo from '@/assets/img/logo.png';
</script>

<template>
    <nav class="p-4 px-16">
        <div class="container mx-auto flex justify-between items-center mb-5">
            <div class="flex items-center">
                <img :src="logo" alt="Logo" class="h-8 mr-2" />
                <span class="text-white text-lg font-semibold"><a href="/">Secret Management</a></span>
            </div>
            <div>
                <button class="bg-green-500 text-white px-4 py-2 rounded">
                    <a href="/login" >Login</a>
                </button>
                <button class="bg-green-500 text-white px-4 py-2 rounded">
                    <a href="/login" >Logout</a>
                </button>
            </div>
        </div>
        <div class="w-full h-px bg-gray-600 m-1"></div>
    </nav>
</template>
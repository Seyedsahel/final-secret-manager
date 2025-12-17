import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig:{
    public:{
      apiBase: 'https://secret-management-backend.nshub.net'
    }
  },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  build:{
    transpile: ['vue-toastification'],
  },
  modules:[
    '@pinia/nuxt',
  ],
  
})

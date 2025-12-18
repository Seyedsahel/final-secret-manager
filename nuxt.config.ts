import tailwindcss from "@tailwindcss/vite";
// Nuxt configuration
// - Registers Pinia as a module for state management.
// - Sets runtime public config (apiBase) used by server proxies.
// - Includes Tailwind/Vite plugin configuration.
// See `nuxt.com/docs` for details.
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
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

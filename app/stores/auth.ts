// Pinia auth store
// - Holds a minimal authentication state used across the app.
// - Keeps `isAuthenticated`, `loading`, and `error` flags and exposes
//   actions for login/register/logout. The store performs the API
//   calls here; it relies on server-side session cookies for persistence.
// - This file intentionally keeps logic small — move network logic to a
//   composable/service if you prefer separation of concerns.
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    loading: false,
    error: null as string | null
  }),

  actions:{
    async login(username: string, password:string){
      this.error = null
      this.loading = true

      try {
        await $fetch('/api/auth/login', {
          method: 'POST',
          body: { username, password }
        })
        this.isAuthenticated = true
        return true
        
      } catch (error: any) {
        this.error = error?.data?.message || 'Login failed'
        return false
      } finally{
        this.loading = false
      }
    },
     async register(username: string, password:string){
      this.error = null
      this.loading = true
      
      try {
        await $fetch('/api/auth/register', {
          method: 'POST',
          body: { username, password }
        })
        return true; 
    } catch (error: any) {
      this.error = error?.data?.message || 'Registration failed'
      return false
    } finally{
      this.loading = false
    }

    },

    async logout(){
      this.loading = true

      try {
        await $fetch('/api/auth/logout', {
          method: 'POST'
        })
        this.isAuthenticated = false
        return true;
        
      } finally{
        this.loading = false
      }
    },
   
    
  } 
  
})
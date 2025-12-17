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
    }
  }
  
})
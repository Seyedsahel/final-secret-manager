import { defineStore } from 'pinia'

type User = {
    id: string;
    username?: string;
    }

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => state.user?.username ?? null,
  },
  actions: {
    setUser(u: User | null) {
      this.user = u
    },
    clearUser() {
      this.user = null
    },
  },
})
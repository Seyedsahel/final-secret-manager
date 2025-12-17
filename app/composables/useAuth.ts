// app/composables/useAuth.ts
import { useAuthStore } from '~/stores/auth'

export default function useAuth() {
  const auth = useAuthStore()

  async function login(payload: { username: string; password: string }) {
    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: payload,
    })
    if (error.value) return { ok: false, error: error.value }
    if (data.value?.user) {
      auth.setUser(data.value.user)     // آپدیت استور تنها از اینجا انجام میشه
      if (data.value.token) localStorage.setItem('auth_token', data.value.token)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid response' }
  }

  async function logout() {
    await useFetch('/api/auth/logout', { method: 'POST' })
    localStorage.removeItem('auth_token')
    auth.clearUser()
  }

  return {
    user: computed(() => auth.user),
    isAuthenticated: computed(() => auth.isAuthenticated),
    login,
    logout,
  }
}
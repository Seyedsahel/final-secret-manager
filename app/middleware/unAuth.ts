import { useAuthStore } from '@/stores/auth';
export default defineNuxtRouteMiddleware((to,from) => {
    const auth = useAuthStore();
    console.log(to,from);
    
    if (auth.isAuthenticated) {
        return navigateTo('/dashboard');
    } 
});
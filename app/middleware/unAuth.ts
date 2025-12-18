// Route middleware: unAuth
// - Redirects authenticated users away from guest-only pages
//   (for example: login/register). If `isAuthenticated` is true,
//   the middleware sends the user to the `/dashboard` route.
import { useAuthStore } from '@/stores/auth';
export default defineNuxtRouteMiddleware((to,from) => {
    const auth = useAuthStore();
    
    if (auth.isAuthenticated) {
        return navigateTo('/dashboard');
    } 
});
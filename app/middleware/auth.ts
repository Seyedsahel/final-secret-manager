// Route middleware: auth
// - Protects routes that require authentication by checking the
//   auth store's `isAuthenticated` flag and redirecting to `/login`
//   when no active session is present. This middleware runs client-side
//   during navigation and relies on the auth store being hydrated.
import { useAuthStore } from '@/stores/auth';
export default defineNuxtRouteMiddleware(() => {
    const auth = useAuthStore();
    if (!auth.isAuthenticated) {
        return navigateTo('/login');
    } 
});
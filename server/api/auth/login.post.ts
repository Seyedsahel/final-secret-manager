// Server login proxy
// - Forwards POST /login to the upstream API and stores the returned
//   token in an HTTP-only cookie so the browser cannot access it via JS.
// - Keep token handling on the server for better security (HTTP-only cookie).
import { LoginResponse} from '~/types/api';
export default defineEventHandler(async(event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const body = await readBody(event);
    try {
        const data = await $fetch<LoginResponse>(
            `${apiBase}/auth/login`,
            {
                method: 'POST',
                body: body
            }
        );
        setCookie(event, 'token', data.data, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7, // a week
         });

        return data;
    } catch (error: any) {
        console.error('Error occurred while logging in:', error);
        throw createError({
            statusCode: error?.statusCode || 400,
            message: error?.data?.message || 'login failed'
        });
    }

});
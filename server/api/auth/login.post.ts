import { LoginResponse} from '~/types/api';
export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    try {
        const data = await $fetch<LoginResponse>(
            'https://secret-management-backend.nshub.net/auth/login',
            {
                method: 'POST',
                body: body
            }
        );
        setCookie(event, 'auth_token', data.data, {
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
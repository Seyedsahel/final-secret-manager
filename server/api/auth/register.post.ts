import { RegisterResponse } from '~/types/api';
export default defineEventHandler(async(event) => {
    const body = await readBody(event);
    try {
        const data = await $fetch<RegisterResponse>(
            'https://secret-management-backend.nshub.net/auth/register',
            {
                method: 'POST',
                body: body
            }
        );

        return data;
    } catch (error: any) {
        console.error('Error occurred while registering:', error);
        throw createError({
            statusCode: error?.statusCode || 400,
            message: error?.data?.message || 'Registration failed'
        });
    }

});
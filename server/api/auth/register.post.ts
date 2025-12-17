import { RegisterResponse } from '~/types/api';
export default defineEventHandler(async(event) => {
    const { public: { apiBase } } = useRuntimeConfig()
    const body = await readBody(event);
    try {
        const data = await $fetch<RegisterResponse>(
            `${apiBase}/auth/register`,
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
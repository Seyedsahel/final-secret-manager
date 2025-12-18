// Server proxy: list records
// - Reads the HTTP-only `token` cookie and forwards a GET request to
//   the upstream `/record/list` endpoint with a Bearer header. Returns
//   the upstream response or maps errors to HTTP responses.
export default defineEventHandler(async(event) => {
    const token = getCookie(event, 'token')

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'unauthorized'
        })
        
    }
    const { public: {apiBase}} = useRuntimeConfig()
    try {
        const data = await $fetch(
            `${apiBase}/record/list`,
            {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                    
                }
            }
        )
        return data;
        
    } catch (error: any) {
        throw createError({
            statusCode: error?.statusCode || 500,
            message: error?.data?.message || 'Failed to fetch records'
        })
        
    }
    
})
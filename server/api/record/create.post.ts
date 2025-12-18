// Server proxy: create record
// - Verifies presence of the HTTP-only `token` cookie and forwards the
//   create request to the upstream API with an Authorization header.
// - Returns upstream response or a mapped error. This keeps token
//   usage on the server and avoids exposing tokens to the client.
export default defineEventHandler(async (event) => {
    const {public : { apiBase } } = useRuntimeConfig()
    const body = await readBody(event)

    const token = getCookie(event, 'token')

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'unauthorized'
        })
    }
    try {
        const data = await $fetch(`${apiBase}/record/create`,{
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body
        })
        return data
    } catch (error: any) {
         throw createError({
            statusCode: error?.statusCode || 400,
            message: error?.data?.message || 'Create record failed'
        })
        
    }

})
// Server proxy: delete record
// - Checks the HTTP-only `token` cookie, forwards the delete request
//   to the upstream API with the token in the Authorization header,
//   and returns the upstream response or an error mapping.
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
        const data = await $fetch(`${apiBase}/record/delete`,{
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
            message: error?.data?.message || 'delete record failed'
        })
        
    }

})
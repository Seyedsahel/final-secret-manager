// Server proxy: update record
// - Ensures an HTTP-only `token` cookie is present and forwards the
//   update request to the upstream API with an Authorization header.
// - Keeps authentication handling on the server side and returns
//   the upstream response or a consistent error for the client.
export default defineEventHandler(async (event) =>{

    const {public : {apiBase}} = useRuntimeConfig()
    const body = await readBody(event)
    const token = getCookie(event,'token')
    if (!token) {
        throw createError({
            statusCode :401,
            message: 'Unauthorized'
        })       
    }
    try {
        const data = await $fetch(`${apiBase}/record/update`,{
            method: 'POST',
            headers:{
                Authorization: `Bearer ${token}`
            },
            body
        })
        return data
    } catch (error: any) {
        throw createError({
            statusCode: error?.statusCode ||400,
            message: error?.data?.message || 'Update record failed'
        })
        
    }
})
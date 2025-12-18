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
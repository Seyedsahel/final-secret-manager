// Server logout endpoint
// - Clears the HTTP-only `token` cookie so the browser session is ended.
// - Clients should call this to terminate the server-managed session.
export default defineEventHandler(async(event) => {
    // Clear the token cookie by setting it to an empty value and a past expiration date
    setCookie(event, 'token', '', {
        httpOnly: true,
        secure: true,
        maxAge: 0, // Expire immediately
     });

    return { message: 'Logged out successfully' };
});
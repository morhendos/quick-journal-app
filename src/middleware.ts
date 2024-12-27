import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    console.log('[MIDDLEWARE] Checking auth for:', req.url)
  },
  {
    callbacks: {
      authorized({ token }) {
        console.log('[MIDDLEWARE] Token check:', !!token)
        return !!token
      }
    }
  }
)

export const config = {
  matcher: ['/', '/protected/:path*']
}
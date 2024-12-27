import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    console.log('Protected route accessed:', req.nextUrl.pathname)
  },
  {
    pages: {
      signIn: '/login',
    }
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
  ],
}
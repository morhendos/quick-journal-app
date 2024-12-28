import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // If no token and not trying to access auth pages, redirect to login
    if (!token && path !== '/login' && path !== '/register') {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', path)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  },
  {
    pages: {
      signIn: '/login',
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        
        // Allow access to auth pages without token
        if (path === '/login' || path === '/register') {
          return true
        }

        // Require token for all other paths
        return !!token
      },
    },
  }
)

export const config = {
  // Match all paths except static assets and API routes
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth/* (auth endpoints)
     * 2. /_next/* (Next.js internals)
     * 3. /favicon.ico, etc (static files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
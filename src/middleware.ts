import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if this is an authentication route
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/auth')
  
  // Get the token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect to login if accessing protected route without token
  if (!token && !isAuthRoute) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // Redirect to home if accessing auth routes with valid token
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Configure protected routes
export const config = {
  matcher: [
    '/',
    '/login',
    '/auth/:path*',
    // Protect all routes except api, static files, images
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
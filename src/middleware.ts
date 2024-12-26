import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    // Get the pathname from the URL directly to avoid body access issues
    const pathname = request.nextUrl.pathname
    
    // Skip middleware for api routes and static files
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/_next') ||
      pathname.includes('favicon.ico')
    ) {
      return NextResponse.next()
    }

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
  } catch (error) {
    console.error('Middleware error:', error)
    // In case of error, allow the request to continue to avoid blocking the application
    return NextResponse.next()
  }
}

// Configure protected routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
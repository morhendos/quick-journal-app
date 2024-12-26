import { auth } from '@/lib/auth/config'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const isOnLoginPage = req.nextUrl.pathname === '/login'

  if (isAuthenticated && isOnLoginPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
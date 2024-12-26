import { auth } from '@/lib/auth/auth'
import { NextResponse } from 'next/server'
 
export default auth((req) => {
  const isLoggedIn = !!req.auth?.user
  const isOnLoginPage = req.nextUrl.pathname === '/login'

  if (isLoggedIn && isOnLoginPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!isLoggedIn && !isOnLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
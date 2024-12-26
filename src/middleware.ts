import { auth } from '@/lib/auth/auth'

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user
  const isOnLogin = req.nextUrl.pathname === '/login'

  if (isLoggedIn && isOnLogin) {
    return Response.redirect(new URL('/', req.url))
  }
  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
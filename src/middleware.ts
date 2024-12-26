import { authConfig } from '@/lib/auth/config'
import NextAuth from 'next-auth'

export const middleware = NextAuth(authConfig).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
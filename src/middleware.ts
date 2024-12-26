import NextAuth from 'next-auth'
import { config } from '@/lib/auth/config'

export const middleware = NextAuth(config).auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
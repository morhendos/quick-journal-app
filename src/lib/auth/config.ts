import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
        return { id: '1', email: credentials.email, name: 'Test User' }
      }
      return null
    }
  })],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl))
      }
      return true
    }
  }
} satisfies NextAuthConfig
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const config = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
          return { 
            id: '1', 
            name: 'Test User',
            email: credentials.email 
          }
        }
        return null
      }
    })
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      
      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl))
      }
      
      if (!isLoggedIn && !isOnLogin) {
        return Response.redirect(new URL('/login', nextUrl))
      }
      
      return true
    }
  }
} satisfies NextAuthConfig

export const { auth, signIn, signOut } = NextAuth(config)
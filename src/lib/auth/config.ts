import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
          return { id: '1', email: credentials.email, name: 'Test User' }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { strategy: 'jwt' }
}

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions)
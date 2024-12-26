import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [Credentials({
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Missing credentials')
      }

      if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
        return { id: '1', email: credentials.email, name: 'Test User' }
      }

      throw new Error('Invalid credentials')
    }
  })],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id
      return session
    }
  }
} satisfies NextAuthConfig
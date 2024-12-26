import NextAuth from 'next-auth'
import type { AuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
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
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login'
  },
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle relative URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Handle full URLs that match base
      if (url.startsWith(baseUrl)) return url
      return baseUrl
    }
  },
  debug: process.env.NODE_ENV === 'development'
} satisfies AuthConfig

export const { auth: handler, signIn, signOut } = NextAuth(authConfig)
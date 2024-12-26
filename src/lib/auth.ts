import type { AuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'

function log(message: string, data?: any) {
  console.log(`[AUTH] ${message}`, data ? JSON.stringify(data, null, 2) : '')
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        log('⚡️ Starting authorize')
        try {
          log('👉 Checking credentials:', { email: credentials?.email })

          if (!credentials?.email || !credentials?.password) {
            log('❌ Missing credentials')
            return NextResponse.json(
              { error: 'Email and password required' },
              { status: 401 }
            )
          }

          if (credentials.email === 'user@example.com' && 
              credentials.password === 'password123') {
            const user = { 
              id: '1', 
              name: 'Test User',
              email: credentials.email 
            }
            log('✅ User authenticated:', user)
            return user
          }

          log('❌ Invalid credentials')
          return null
        } catch (error) {
          log('💥 Auth error:', error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      log('🎫 signIn callback:', { user, account, profile })
      return true
    },
    async jwt({ token, user }) {
      log('🔐 JWT callback:', { token, user })
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      log('📤 Returning token:', token)
      return token
    },
    async session({ session, token }) {
      log('🔑 Session callback:', { session, token })
      if (session?.user) {
        (session.user as User & { id: string }).id = token.id as string
      }
      log('📤 Returning session:', session)
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
}
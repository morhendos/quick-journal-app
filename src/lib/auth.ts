import type { AuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

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
        log('👉 authorize() called with credentials:', credentials)
        log('👉 authorize() request:', { url: req?.url, method: req?.method })

        if (!credentials?.email || !credentials?.password) {
          log('❌ Missing credentials')
          throw new Error('Email and password required')
        }

        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          const user = { 
            id: '1', 
            name: 'Test User',
            email: credentials.email 
          }
          log('✅ Valid credentials, returning user:', user)
          return user
        }

        log('❌ Invalid credentials')
        throw new Error('Invalid credentials')
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      log('🎫 signIn() callback:', { user, account, profile, email, credentials })
      return true
    },
    async jwt({ token, user, account, profile }) {
      log('🎭 jwt() callback:', { token, user, account, profile })
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token, user }): Promise<Session> {
      log('🔑 session() callback:', { session, token, user })
      if (session?.user) {
        (session.user as User & { id: string }).id = token.id as string
      }
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
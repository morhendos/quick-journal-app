import type { AuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

// Improved logging with request ID for tracing
const createLogger = () => {
  const requestId = Math.random().toString(36).substring(7)
  return {
    info: (message: string, data?: any) => 
      console.log(`[AUTH ${requestId}] ℹ️ ${message}`, data ? JSON.stringify(data) : ''),
    error: (message: string, data?: any) => 
      console.error(`[AUTH ${requestId}] ❌ ${message}`, data ? JSON.stringify(data) : '')
  }
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
      async authorize(credentials) {
        const log = createLogger()
        log.info('Starting authorization')

        if (!credentials?.email || !credentials?.password) {
          log.error('Missing credentials')
          return null
        }

        try {
          // TODO: Replace with actual user validation
          if (credentials.email === 'user@example.com' && 
              credentials.password === 'password123') {
            const user = { 
              id: '1', 
              email: credentials.email,
              name: 'Test User'
            }
            log.info('User authenticated successfully', { email: user.email })
            return user
          }

          log.error('Invalid credentials', { email: credentials.email })
          return null

        } catch (error) {
          log.error('Authentication error', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const log = createLogger()
      log.info('JWT callback', { userId: user?.id })

      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    async session({ session, token }): Promise<Session> {
      const log = createLogger()
      log.info('Session callback', { userId: token.id })

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string
        }
      }
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// Type augmentation for better TypeScript support
declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
    }
  }
}

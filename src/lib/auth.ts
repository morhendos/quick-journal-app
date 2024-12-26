import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('[AUTH] authorize called with:', { 
          credentials,
          headers: req?.headers,
          method: req?.method,
          body: req?.body
        })

        if (!credentials?.email || !credentials?.password) {
          console.log('[AUTH] Missing credentials')
          return null
        }

        if (credentials.email === 'user@example.com' && 
            credentials.password === 'password123') {
          const user = { 
            id: '1', 
            email: credentials.email,
            name: 'Test User'
          }
          console.log('[AUTH] User authorized:', user)
          return user
        }

        console.log('[AUTH] Invalid credentials')
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('[AUTH] signIn callback:', { user, account, profile })
      return true
    },
    async jwt({ token, user }) {
      console.log('[AUTH] JWT callback:', { token, user })
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log('[AUTH] Session callback:', { session, token })
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  debug: true,
  logger: {
    error(code, ...message) {
      console.error('[AUTH]', { code, message })
    },
    warn(code, ...message) {
      console.warn('[AUTH]', { code, message })
    },
    debug(code, ...message) {
      console.log('[AUTH]', { code, message })
    }
  }
}
import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const config = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('[AUTH] authorize called with:', { 
          email: credentials?.email,
          hasPassword: !!credentials?.password,
          headers: req?.headers
        })

        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('[AUTH] Missing credentials')
            return null
          }

          if (credentials.email === 'user@example.com' && 
              credentials.password === 'password123') {
            console.log('[AUTH] Valid credentials, returning user')
            return { 
              id: '1', 
              email: credentials.email, 
              name: 'Test User' 
            }
          }

          console.log('[AUTH] Invalid credentials match')
          return null
        } catch (error) {
          console.error('[AUTH] Error in authorize:', error)
          return null
        }
      }
    })
  ],
  pages: { 
    signIn: '/login'
  },
  debug: true,
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('[AUTH] JWT Callback:', { token, user })
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log('[AUTH] Session Callback:', { session, token })
      if (session?.user) {
        session.user.id = token.id
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
} satisfies AuthOptions

export const auth = NextAuth(config)
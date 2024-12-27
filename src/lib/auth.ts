import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        console.log('[AUTH] authorize called:', {
          credentials,
          headers: req?.headers,
          method: req?.method
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
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log('[AUTH] signIn callback:', { user, account })
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
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    }
  },
  debug: true,
  trustHost: true
}
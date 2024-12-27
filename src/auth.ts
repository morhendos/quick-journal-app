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
      async authorize(credentials) {
        console.log('[AUTH] authorize called:', credentials)

        try {
          if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
            return { 
              id: '1', 
              email: credentials.email, 
              name: 'Test User' 
            }
          }
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
  debug: process.env.NODE_ENV === 'development',
  session: { 
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
} satisfies AuthOptions

export const auth = NextAuth(config)
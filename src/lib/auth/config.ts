import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('🔍 Authorize called with:', credentials)

        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          throw new Error('Please provide both email and password')
        }

        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          console.log('✅ Credentials match, authorizing user')
          const user = { 
            id: '1', 
            name: 'Test User',
            email: credentials.email 
          }
          console.log('📤 Returning user:', user)
          return user
        }

        console.log('❌ Invalid credentials provided')
        throw new Error('Invalid credentials')
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('🎫 JWT Callback:', { token, user, account })
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      console.log('📤 Returning token:', token)
      return token
    },
    async session({ session, token }) {
      console.log('🔑 Session Callback:', { session, token })
      if (session?.user) {
        session.user.id = token.id
        session.user.email = token.email as string
      }
      console.log('📤 Returning session:', session)
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
}
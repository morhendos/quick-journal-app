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
        console.log('Authorize called with:', credentials)

        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          console.log('Credentials match, authorizing user')
          return { 
            id: '1', 
            name: 'Test User',
            email: credentials.email 
          }
        }
        console.log('Invalid credentials provided')
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT Callback:', { token, user })
      return token
    },
    async session({ session, token }) {
      console.log('Session Callback:', { session, token })
      if (session?.user) {
        session.user.id = token.sub
      }
      return session
    }
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET
}
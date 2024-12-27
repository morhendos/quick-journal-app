import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { 
          label: 'Email',
          type: 'email', 
          placeholder: 'email@example.com' 
        },
        password: { 
          label: 'Password', 
          type: 'password',
          placeholder: '•••••••••'
        }
      },
      async authorize(credentials, req) {
        try {
          console.log('Authorize attempt:', credentials?.email)

          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            console.log('Missing credentials')
            return null
          }

          if (credentials.email === 'user@example.com' && 
              credentials.password === 'password123') {
            // Valid credentials
            const user = {
              id: '1',
              email: credentials.email,
              name: 'Test User'
            }
            console.log('Auth success:', user.email)
            return user
          }

          console.log('Invalid credentials')
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        console.log('JWT callback - new token')
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session callback')
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  debug: true
}
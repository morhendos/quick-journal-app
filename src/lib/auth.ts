import { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { AuthError } from 'next-auth'

const credentialsAuth = Credentials({
  name: 'Credentials',
  credentials: {
    email: { 
      label: 'Email', 
      type: 'email', 
      placeholder: 'user@example.com' 
    },
    password: { 
      label: 'Password', 
      type: 'password',
      placeholder: '••••••••'
    }
  },
  async authorize(credentials, req) {
    try {
      if (!credentials?.email || !credentials?.password) {
        console.log('Missing credentials')
        return null
      }

      // In production this would be a database check
      const isValid = credentials.email === 'user@example.com' && 
                     credentials.password === 'password123'

      if (!isValid) {
        console.log('Invalid credentials')
        throw new AuthError('Invalid credentials')
      }

      const user = {
        id: '1',
        email: credentials.email,
        name: 'Test User'
      }

      console.log('Auth successful, returning:', user)
      return user
    } catch (error) {
      console.error('Auth error:', error)
      throw error
    }
  }
})

export const authOptions: NextAuthConfig = {
  providers: [credentialsAuth],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }) {
      console.log('signIn callback:', { user, account })
      return true
    },
    async session({ session, token }) {
      console.log('session callback:', { session, token })
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async jwt({ token, user, account }) {
      console.log('jwt callback:', { token, user, account })
      if (user) {
        token.sub = user.id
      }
      return token
    }
  },
  pages: {
    signIn: '/login'
  },
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET
}

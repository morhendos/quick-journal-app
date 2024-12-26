import { NextAuthConfig, type Session, type User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('Starting authorization attempt')
        
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        try {
          if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
            const user = { 
              id: '1', 
              email: credentials.email,
              name: 'Test User'
            }
            console.log('Auth successful, returning user:', user)
            return user
          }
          
          console.log('Invalid credentials')
          return null
        } catch (error) {
          console.log('Auth error:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback:', { user, account, profile })
      return true
    },
    async jwt({ token, user }) {
      console.log('JWT Callback - Input:', { token, user })
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      console.log('JWT Callback - Output token:', token)
      return token
    },
    async session({ session, token }): Promise<Session> {
      console.log('Session Callback - Input:', { session, token })
      if (session?.user) {
        (session.user as User & { id: string }).id = token.id as string
      }
      console.log('Session Callback - Output session:', session)
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
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
    }
  }
}
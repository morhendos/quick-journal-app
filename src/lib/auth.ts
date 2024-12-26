import type { AuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('👉 Authorize called with:', credentials)

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }

        if (credentials.email === 'user@example.com' && credentials.password === 'password123') {
          console.log('✅ Credentials valid, returning user')
          return { 
            id: '1', 
            name: 'Test User',
            email: credentials.email 
          }
        }

        console.log('❌ Invalid credentials')
        throw new Error('Invalid credentials')
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('🎫 JWT callback:', { token, user })
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      console.log('🔑 Session callback:', { session, token })
      if (session?.user) {
        (session.user as User & { id: string }).id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET
}
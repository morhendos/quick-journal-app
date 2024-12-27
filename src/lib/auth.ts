import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('[AUTH] authorize started:', credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For testing only - proper auth would check a database
        if (credentials.email === 'user@example.com' && 
            credentials.password === 'password123') {
          const user = {
            id: '1',
            email: credentials.email,
            name: 'Test User'
          }
          console.log('[AUTH] authorize success:', user)
          return user
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,  // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      console.log('[AUTH] jwt callback:', { token, user })
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log('[AUTH] session callback:', session)
      if (session.user) {
        session.user.id = token.sub!
      }
      return session
    }
  }
}
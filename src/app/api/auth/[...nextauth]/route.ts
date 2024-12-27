import NextAuth, { type AuthOptions } from 'next-auth'
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
        console.log('[AUTH] Authorize attempt:', credentials?.email)

        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (credentials.email === 'user@example.com' && 
            credentials.password === 'password123') {
          return {
            id: '1',
            email: credentials.email,
            name: 'Test User'
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('[AUTH] JWT callback:', { token, userId: user?.id })
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      console.log('[AUTH] Session callback:', { sessionUser: session?.user, tokenId: token?.id })
      if (session?.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
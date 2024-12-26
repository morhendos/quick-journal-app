import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const nextAuthHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
          return { id: '1', email: credentials.email, name: 'Test User' }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})
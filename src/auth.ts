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
        if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
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
  pages: { 
    signIn: '/login'
  },
  session: { 
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
} satisfies AuthOptions

export const auth = NextAuth(config)
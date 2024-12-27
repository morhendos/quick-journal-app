import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
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
  session: { strategy: 'jwt' },
  useSecureCookies: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development'
}
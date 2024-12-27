import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('[AUTH] authorize called:', credentials)

        if (!credentials?.email || !credentials?.password) {
          console.log('[AUTH] Missing credentials')
          return null
        }

        if (credentials.email === 'user@example.com' && 
            credentials.password === 'password123') {
          const user = {
            id: '1',
            email: credentials.email,
            name: 'Test User'
          }
          console.log('[AUTH] User authorized:', user)
          return user
        }
        return null
      }
    })
  ],
  jwt: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  session: {
    strategy: 'jwt'
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    }
  },
  debug: true
}
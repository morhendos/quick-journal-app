import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      authorize: async (credentials) => {
        if (credentials?.email === 'user@example.com' && 
            credentials?.password === 'password123') {
          return { id: '1', email: 'user@example.com', name: 'Test User' }
        }
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: '/login' },
  useSecureCookies: false,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: false
      }
    }
  },
  debug: true
}
import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' }
    },
    async authorize(credentials) {
      console.log('[AUTH] authorize called:', credentials)
      if (credentials?.email === 'user@example.com' && credentials?.password === 'password123') {
        return { id: '1', email: credentials.email, name: 'Test User' }
      }
      return null
    }
  })],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
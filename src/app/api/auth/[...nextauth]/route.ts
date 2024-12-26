import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const debug = (...args: any[]) => {
  console.log('[AUTH]', ...args)
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        debug('authorize called:', { credentials })

        if (!credentials?.email || !credentials?.password) {
          debug('Missing credentials')
          return null
        }

        if (credentials.email === 'user@example.com' && 
            credentials.password === 'password123') {
          const user = { 
            id: '1', 
            email: credentials.email,
            name: 'Test User'
          }
          debug('Auth successful:', user)
          return user
        }

        debug('Invalid credentials')
        return null
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      debug('signIn callback:', { user, account })
      return true
    },
    async jwt({ token, user }) {
      debug('jwt callback:', { token, user })
      return token
    },
    async session({ session, token }) {
      debug('session callback:', { session, token })
      return session
    }
  },
  pages: {
    signIn: '/login'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  logger: {
    error(code, ...message) {
      debug('ERROR:', { code, message })
    },
    warn(code, ...message) {
      debug('WARN:', { code, message })
    },
    debug(code, ...message) {
      debug('DEBUG:', { code, message })
    }
  }
}

export async function GET(request: Request) {
  debug('GET', request.url)
  return await NextAuth(authOptions)(request)
}

export async function POST(request: Request) {
  debug('POST', request.url)
  const body = await request.clone().text()
  debug('POST body:', body)
  return await NextAuth(authOptions)(request)
}
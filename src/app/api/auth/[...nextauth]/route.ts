import NextAuth from 'next-auth'
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
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    }
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  debug: true
}

const handler = NextAuth(authOptions)

export async function GET(req: Request) {
  const response = await handler(req)
  console.log('[AUTH] GET Response headers:', Object.fromEntries(response.headers))
  return response
}

export async function POST(req: Request) {
  const body = await req.clone().text()
  console.log('[AUTH] POST body:', body)
  
  const response = await handler(req)
  console.log('[AUTH] POST Response headers:', Object.fromEntries(response.headers))
  return response
}
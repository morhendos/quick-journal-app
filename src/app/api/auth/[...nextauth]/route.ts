import NextAuth from 'next-auth'
import { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        console.log('authorize called:', { credentials })
        
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // For testing only
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
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export async function GET(request: Request) {
  const response = await handler(request)
  console.log('GET auth response:', {
    url: request.url,
    headers: Object.fromEntries(response.headers)
  })
  return response
}

export async function POST(request: Request) {
  const body = await request.text()
  console.log('POST auth request:', {
    url: request.url,
    body,
    headers: Object.fromEntries(request.headers)
  })

  const response = await handler(request)
  console.log('POST auth response:', {
    headers: Object.fromEntries(response.headers)
  })

  return response
}
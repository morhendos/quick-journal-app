import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { AUTH_CONFIG } from './config'
import { AuthError, validateEmail, validatePassword } from './validation'
import { authenticateUser } from './auth-service'

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET must be set in environment variables')
}

if (!process.env.NEXTAUTH_URL && process.env.NODE_ENV === 'production') {
  throw new Error('NEXTAUTH_URL must be set in production environment')
}

export const authOptions: AuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new AuthError('Email and password are required', 'invalid_credentials')
        }

        if (!validateEmail(credentials.email)) {
          throw new AuthError('Invalid email format', 'invalid_credentials')
        }

        if (!validatePassword(credentials.password)) {
          throw new AuthError('Password must be at least 8 characters', 'invalid_credentials')
        }

        try {
          const user = await authenticateUser(credentials.email, credentials.password)
          return user
        } catch (error) {
          if (error instanceof AuthError) {
            throw error
          }
          throw new AuthError('Authentication failed', 'invalid_credentials')
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.roles = user.roles
      }
      return token
    },

    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.user.roles = token.roles
      return session
    },
  },

  pages: AUTH_CONFIG.ROUTES,

  session: {
    strategy: 'jwt',
    maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
  },

  cookies: {
    csrfToken: {
      name: AUTH_CONFIG.COOKIE_NAME,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'strict',
      },
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
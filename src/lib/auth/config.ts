export const AUTH_CONFIG = {
  COOKIE_NAME: 'next-auth.csrf-token',
  SESSION_MAX_AGE: 30 * 24 * 60 * 60, // 30 days
  ROUTES: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  }
} as const
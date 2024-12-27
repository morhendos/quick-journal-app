import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

// Regular Node.js runtime for crypto support
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
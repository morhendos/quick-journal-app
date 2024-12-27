import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const auth = NextAuth(authOptions)

// Export handlers using edge runtime to avoid compatibility issues
export const runtime = 'edge'

// These export handlers properly adapt the Next.js App Router request/response
export const GET = auth
export const POST = auth
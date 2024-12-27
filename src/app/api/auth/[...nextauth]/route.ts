import NextAuth from 'next-auth'
import { config } from '@/auth'

const handler = NextAuth(config)

// Export individual handler functions for better type safety
export const GET = handler
export const POST = handler
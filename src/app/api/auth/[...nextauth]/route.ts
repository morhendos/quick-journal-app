import NextAuth from 'next-auth'
import { type NextAuthConfig } from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions as NextAuthConfig)

export const GET = handler
export const POST = handler
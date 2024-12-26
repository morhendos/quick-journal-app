import { authConfig } from '@/lib/auth/config'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'

const handler = NextAuth(authConfig)

export const GET = handler.providers

import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const nextauthPath = request.nextUrl.pathname.replace('/api/auth/', '')
  console.log('[AUTH] GET:', { path: nextauthPath })
  return await NextAuth(authOptions)(request)
}

export async function POST(request: NextRequest) {
  const nextauthPath = request.nextUrl.pathname.replace('/api/auth/', '')
  const body = await request.clone().text()
  console.log('[AUTH] POST:', { path: nextauthPath, body })
  return await NextAuth(authOptions)(request)
}
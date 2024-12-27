import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export async function GET(req: Request) {
  console.log('[AUTH-ROUTE] GET:', req.url)
  return handler(req)
}

export async function POST(req: Request) {
  console.log('[AUTH-ROUTE] POST:', req.url)
  const body = await req.clone().text()
  console.log('[AUTH-ROUTE] POST body:', body)
  return handler(req)
}
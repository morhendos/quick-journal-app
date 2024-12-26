import NextAuth from 'next-auth'
import { type NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export async function GET(request: NextRequest) {
  console.log('GET auth request:', request.url)
  return handler(request)
}

export async function POST(request: NextRequest) {
  console.log('POST auth request:', request.url)
  const body = await request.json().catch(() => ({}))
  console.log('POST body:', body)
  return handler(request)
}

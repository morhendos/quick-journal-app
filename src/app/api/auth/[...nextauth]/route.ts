import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const auth = NextAuth(authOptions)

export async function GET(request: Request) {
  const response = await auth(request)
  console.log('GET auth response:', {
    url: request.url,
    status: response.status,
    headers: Object.fromEntries(response.headers.entries())
  })
  return response
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('POST auth request:', {
      url: request.url,
      body,
      headers: Object.fromEntries(request.headers.entries())
    })

    const response = await auth(request)
    console.log('POST auth response:', {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries())
    })

    return response
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 })
  }
}
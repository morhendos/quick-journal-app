import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'

async function extractBody(request: NextRequest) {
  try {
    const clone = request.clone()
    const text = await clone.text()
    console.log('[AUTH-ROUTE] Request body:', text)
    return text
  } catch (e) {
    console.log('[AUTH-ROUTE] Could not extract body')
    return null
  }
}

const handler = NextAuth(authOptions)

export async function GET(request: NextRequest) {
  console.log('[AUTH-ROUTE] GET', request.url)
  console.log('[AUTH-ROUTE] Headers:', Object.fromEntries(request.headers))
  const response = await handler(request)
  console.log('[AUTH-ROUTE] Response headers:', Object.fromEntries(response.headers))
  return response
}

export async function POST(request: NextRequest) {
  console.log('[AUTH-ROUTE] POST', request.url)
  console.log('[AUTH-ROUTE] Headers:', Object.fromEntries(request.headers))
  await extractBody(request)
  const response = await handler(request)
  console.log('[AUTH-ROUTE] Response headers:', Object.fromEntries(response.headers))
  return response
}
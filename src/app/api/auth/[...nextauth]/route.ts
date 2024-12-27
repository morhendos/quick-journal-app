import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'

const auth = NextAuth(authOptions)

export async function GET(request: NextRequest) {
  const nextauthPath = request.nextUrl.pathname.replace('/api/auth/', '')
  const searchParams = request.nextUrl.searchParams
  
  // Reconstruct the query object NextAuth expects
  const query = {
    nextauth: nextauthPath.split('/'),
    ...Object.fromEntries(searchParams.entries())
  }
  
  // Pass the modified request to NextAuth
  const modifiedRequest = new Request(request.url, {
    headers: request.headers,
    cache: request.cache,
    credentials: request.credentials,
    method: request.method,
    body: request.body,
  })
  Object.defineProperty(modifiedRequest, 'query', { value: query })
  
  return auth(modifiedRequest)
}

export async function POST(request: NextRequest) {
  const nextauthPath = request.nextUrl.pathname.replace('/api/auth/', '')
  const searchParams = request.nextUrl.searchParams
  
  // Reconstruct the query object NextAuth expects
  const query = {
    nextauth: nextauthPath.split('/'),
    ...Object.fromEntries(searchParams.entries())
  }
  
  // Pass the modified request to NextAuth
  const modifiedRequest = new Request(request.url, {
    headers: request.headers,
    cache: request.cache,
    credentials: request.credentials,
    method: request.method,
    body: request.body,
  })
  Object.defineProperty(modifiedRequest, 'query', { value: query })
  
  return auth(modifiedRequest)
}
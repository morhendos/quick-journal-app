import NextAuth from 'next-auth'
import { NextRequest } from 'next/server'
import { authOptions } from '@/lib/auth'

const auth = NextAuth(authOptions)

async function createModifiedRequest(request: NextRequest) {
  const nextauthPath = request.nextUrl.pathname.replace('/api/auth/', '')
  const searchParams = request.nextUrl.searchParams

  // Reconstruct the query object NextAuth expects
  const query = {
    nextauth: nextauthPath.split('/'),
    ...Object.fromEntries(searchParams.entries())
  }

  const opts: RequestInit = {
    headers: request.headers,
    cache: request.cache,
    credentials: request.credentials,
    method: request.method,
    duplex: 'half'
  }

  if (request.method === 'POST') {
    const clonedRequest = request.clone()
    const body = await clonedRequest.text()
    if (body) {
      opts.body = body
    }
  }

  // Create new request with the query object
  const modifiedRequest = new Request(request.url, opts)
  Object.defineProperty(modifiedRequest, 'query', { value: query })

  return modifiedRequest
}

export async function GET(request: NextRequest) {
  const modifiedRequest = await createModifiedRequest(request)
  return auth(modifiedRequest)
}

export async function POST(request: NextRequest) {
  const modifiedRequest = await createModifiedRequest(request)
  return auth(modifiedRequest)
}
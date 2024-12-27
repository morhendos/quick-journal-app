import { NextRequest } from 'next/server'
import { auth } from '@/auth'

async function handler(req: NextRequest) {
  const { GET, POST } = auth

  console.log('[AUTH] Route handler called:', {
    method: req.method,
    url: req.url,
    nextUrl: req.nextUrl
  })

  if (req.method === 'GET') {
    return GET(req)
  }

  if (req.method === 'POST') {
    return POST(req)
  }

  return new Response(null, { status: 405 })
}

export { handler as GET, handler as POST }
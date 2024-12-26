import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth/config'

export async function GET(request: NextRequest) {
  const response = await auth(request)
  if (!response) {
    return new Response(JSON.stringify({ csrfToken: null }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  return response
}
import { auth } from '@/lib/auth/config'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const response = await auth(request)
  return Response.json({ csrfToken: response?.cookies.get('next-auth.csrf-token')?.value })
}
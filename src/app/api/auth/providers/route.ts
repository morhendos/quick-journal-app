import { type NextRequest } from 'next/server'
import { handler } from '@/lib/auth/config'

export async function GET(request: NextRequest) {
  return await handler(request)
}
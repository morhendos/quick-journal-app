import { type NextRequest } from 'next/server'
import { auth } from '@/lib/auth/config'

export const GET = async (request: NextRequest) => {
  return await auth(request)
}

export const POST = async (request: NextRequest) => {
  return await auth(request)
}
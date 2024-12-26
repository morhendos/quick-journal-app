import { auth } from '@/lib/auth/config'

export async function GET(request: Request) {
  return await auth(request)
}

export async function POST(request: Request) {
  return await auth(request)
}
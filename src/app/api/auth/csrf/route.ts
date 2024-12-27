import { NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  const csrfToken = crypto.randomBytes(32).toString('hex')
  
  return NextResponse.json({ 
    csrfToken,
    session
  }, {
    headers: {
      'Set-Cookie': `next-auth.csrf-token=${csrfToken}; Path=/; HttpOnly; SameSite=Lax`
    }
  })
}
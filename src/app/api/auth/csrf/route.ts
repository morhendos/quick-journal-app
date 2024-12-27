import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { config } from '@/auth'
import { getServerSession } from 'next-auth'

export async function GET() {
  const session = await getServerSession(config)
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
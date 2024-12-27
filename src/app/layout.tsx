import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { getServerSession } from 'next-auth'
import { config } from '@/auth'
import NextAuthProvider from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quick Journal App',
  description: 'Simple journaling app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const session = await getServerSession(config)
  console.log('Layout session:', session)
  
  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
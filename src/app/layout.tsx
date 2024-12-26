import type { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { headers } from 'next/headers'
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
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  )
}
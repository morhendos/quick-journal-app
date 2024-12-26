import { SessionProvider } from 'next-auth/react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quick Journal App',
  description: 'Simple journaling app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
'use client'

import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function SignOutPage() {
  useEffect(() => {
    // Redirect to home page after signout
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Signing out...</p>
    </div>
  )
}
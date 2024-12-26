'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/login' })
    } catch (error) {
      console.error('Error signing out:', error)
      // Fallback redirect
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-semibold text-gray-700 hover:text-gray-900"
    >
      Log out
    </button>
  )
}
'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true
      })
    } catch (error) {
      console.error('Error signing out:', error)
      window.location.href = '/login'
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
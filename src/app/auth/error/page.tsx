'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: Record<string, string> = {
    'CredentialsSignin': 'Invalid email or password',
    'Default': 'An error occurred during authentication'
  }

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-xl font-bold text-red-600">Authentication Error</h1>
        <p className="text-gray-600">{errorMessage}</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Return to Login
        </button>
      </div>
    </div>
  )
}

export default function AuthError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  )
}
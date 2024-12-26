'use client'

import { signIn, useSession } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Debug logs for session state
  useEffect(() => {
    console.log('🔑 Session state:', {
      session: session,
      status: status,
      callbackUrl: callbackUrl
    })
  }, [session, status, callbackUrl])

  // Redirect if already authenticated
  useEffect(() => {
    if (session && status === 'authenticated') {
      console.log('✅ Already authenticated, redirecting to:', callbackUrl)
      router.push(callbackUrl)
    }
  }, [session, status, callbackUrl, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    console.log('🔐 Login attempt with:', { email, callbackUrl })

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl
      })

      console.log('📦 Full sign in result:', JSON.stringify(result, null, 2))

      if (result?.error) {
        console.error('❌ Sign in error:', result.error)
        setError(result.error)
        setIsLoading(false)
        return
      }

      if (result?.ok) {
        console.log('✅ Sign in successful, refreshing session...')
        router.refresh()
        console.log('✅ Redirecting to:', callbackUrl)
        router.push(callbackUrl)
      }
    } catch (error) {
      console.error('❌ Sign in exception:', error)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue="user@example.com"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                required
                defaultValue="password123"
                type="password"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
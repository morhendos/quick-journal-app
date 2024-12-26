'use client'

import { signIn, getCsrfToken } from 'next-auth/react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [csrfToken, setCsrfToken] = useState<string>()

  useEffect(() => {
    const getToken = async () => {
      const token = await getCsrfToken()
      console.log('CSRF Token:', token)
      setCsrfToken(token)
    }
    getToken()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      console.log('Attempting sign in:', { email, csrfToken })

      const result = await signIn('credentials', {
        email,
        password,
        csrfToken,
        callbackUrl,
        redirect: true
      })

      console.log('Auth result:', result)

    } catch (error) {
      console.error('Login error:', error)
      setError('An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          
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
                autoComplete="email"
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
                type="password"
                required
                autoComplete="current-password"
                defaultValue="password123"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !csrfToken}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
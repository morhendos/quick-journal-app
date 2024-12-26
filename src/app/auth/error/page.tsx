'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    // If there's no error, redirect to login
    if (!error) {
      router.replace('/login');
    }
  }, [error, router]);

  const getErrorMessage = (error: string) => {
    switch (error) {
      case 'CredentialsSignin':
        return 'Invalid email or password';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to access this resource.';
      default:
        return 'An error occurred during authentication';
    }
  };

  if (!error) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="rounded-lg bg-white dark:bg-gray-800 p-8 shadow-lg text-center max-w-md w-full mx-4">
        <h1 className="mb-4 text-2xl font-bold text-red-600 dark:text-red-400">Authentication Error</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{getErrorMessage(error)}</p>
        <button
          onClick={() => router.push('/login')}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
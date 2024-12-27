export class AuthError extends Error {
  constructor(
    message: string,
    public code: 'invalid_credentials' | 'user_not_found' | 'invalid_token' | 'unauthorized'
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}
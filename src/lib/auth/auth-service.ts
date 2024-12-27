import { CustomUser } from '@/types/auth'
import { AuthError } from './validation'

// Development test users
const DEV_TEST_USERS = [
  {
    id: '1',
    email: 'morhendos@gmail.com',
    password: 'YourStrongPassword123!', // Your original test password
    name: 'Test User 1',
    roles: [{ id: '1', name: 'user' }]
  }
]

export async function authenticateUser(email: string, password: string): Promise<CustomUser> {
  // Development mode authentication
  if (process.env.NODE_ENV === 'development') {
    console.log('[DEV AUTH] Attempting login with:', { email })
    
    const testUser = DEV_TEST_USERS.find(user => 
      user.email === email && user.password === password
    )
    
    if (testUser) {
      // Don't include password in the returned user object
      const { password: _, ...safeUserData } = testUser
      return safeUserData
    }
  }
  
  // Production mode authentication
  // TODO: Implement your actual database authentication here
  throw new AuthError('Invalid credentials', 'invalid_credentials')
}
import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export interface UserRole {
  id: string
  name: string
}

export interface CustomUser extends DefaultUser {
  id: string
  email: string
  name: string
  roles?: UserRole[]
}

declare module 'next-auth' {
  interface User extends CustomUser {}
  
  interface Session extends DefaultSession {
    user: CustomUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    roles?: UserRole[]
  }
}
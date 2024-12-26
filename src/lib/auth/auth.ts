import NextAuth from 'next-auth'
import { authConfig } from './config'

export const { auth, handlers } = NextAuth(authConfig)
export const { GET, POST } = handlers
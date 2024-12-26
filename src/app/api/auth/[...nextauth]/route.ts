import { handlers } from '@auth/nextjs'
import { config } from '@/lib/auth/config'

export const { GET, POST } = handlers(config)
import { z } from 'zod'
import { registerSchema, loginSchema } from './auth.schema'
import { UserType } from '@/types'

export type RegisterInputType = z.infer<typeof registerSchema>

export type AuthResType = {
  success: true
  token: string
  user: UserType
}

export type LoginInputType = z.infer<typeof loginSchema>

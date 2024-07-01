import { z } from 'zod'
import { registerSchema, loginSchema } from './auth.schema'

export type RegisterInputType = z.infer<typeof registerSchema>

export type AuthResType = {
  success: true
  token: string
}

export type LoginInputType = z.infer<typeof loginSchema>

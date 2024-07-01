import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First Name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last Name must be at least 2 characters.',
  }),
  email: z.string().email(),
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
})

export const loginSchema = registerSchema.omit({
  firstName: true,
  lastName: true,
})

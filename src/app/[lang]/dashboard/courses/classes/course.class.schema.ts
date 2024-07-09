import { z } from 'zod'

export const courseClassSchema = z.object({
  priceId: z.string().uuid(),
  name: z
    .string({
      required_error: 'The class name is required',
    })
    .min(3, { message: 'The class name must be at least 3 characters' }),
  displayOnWebsite: z.string(z.coerce.boolean().default(false)),
})

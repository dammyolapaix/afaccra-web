import { z } from 'zod'

export const courseCohortSchema = z.object({
  courseId: z.string().uuid(),
  startDate: z.coerce.date({
    required_error: 'The starting date is required',
    invalid_type_error: 'Invalid date',
  }),
  endDate: z.coerce.date({
    required_error: 'The ending date is required',
    invalid_type_error: 'Invalid date',
  }),
  isActive: z.boolean().default(false),
})

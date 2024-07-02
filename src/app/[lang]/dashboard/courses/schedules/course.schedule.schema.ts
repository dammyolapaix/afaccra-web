import { z } from 'zod'

export const courseScheduleSchema = z.object({
  courseId: z.string().uuid(),
  time: z.string({
    required_error: 'The time is required',
  }),
})

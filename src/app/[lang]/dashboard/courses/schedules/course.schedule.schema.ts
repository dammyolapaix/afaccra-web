import { z } from 'zod'

export const courseScheduleSchema = z.object({
  courseId: z.string().uuid(),
  startTime: z.string({
    required_error: 'The starting time is required',
  }),
  endTime: z.string({
    required_error: 'The ending time is required',
  }),
})

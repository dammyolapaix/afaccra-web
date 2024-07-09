import { z } from 'zod'

export const courseLevelPriceTypeEnum = ['A1/A2', 'B1/B2', 'C1/C2'] as const

export const courseChildPriceTypeEnum = [
  '1st child',
  '2nd child',
  '3rd child',
] as const

export const coursePriceSchema = z.object({
  courseId: z.string().uuid(),
  levelId: z.string().uuid().optional(),
  child: z.enum(courseChildPriceTypeEnum).optional(),
  amount: z.coerce.number(),
})

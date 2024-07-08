import { z } from 'zod'

export const courseDaysEnum = [
  'sundays',
  'mondays',
  'tuesdays',
  'wednesdays',
  'thursdays',
  'fridays',
  'saturdays',
] as const

export const courseDeliveryModeEnum = ['in-person', 'online'] as const

export const courseDurationPeriodEnum = [
  'days',
  'weeks',
  'months',
  'years',
] as const

export const courseAudienceEnum = ['adults', 'kids'] as const

export const courseLanguageEnum = ['english', 'french'] as const

const areAllOrNoneProvided = <T>(obj: T, keys: (keyof T)[]): boolean => {
  const providedCount = keys.reduce(
    (count, key) => (obj[key] !== undefined ? count + 1 : count),
    0
  )
  return providedCount === 0 || providedCount === keys.length
}

export const courseSchema = z
  .object({
    titleEn: z
      .string()
      .trim()
      .min(3, {
        message: 'error.course.titleEn_3_min',
      })
      .optional(),
    titleFr: z
      .string()
      .min(3, {
        message: 'error.course.titleFr_3_min',
      })
      .optional(),
    deliveryMode: z.enum(courseDeliveryModeEnum).optional(),
    days: z.enum(courseDaysEnum).array(),
    audience: z.enum(courseAudienceEnum).optional(),
    language: z.enum(courseLanguageEnum).optional(),
    objectiveEn: z.string().optional(),
    objectiveFr: z.string().optional(),
    curriculumEn: z.string().optional(),
    curriculumFr: z.string().optional(),
    isPublished: z.boolean().optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.titleEn && !val.titleFr) {
      ctx.addIssue({
        message: 'locale.pages.dashboard.courses.add_course',
        code: 'custom',
        path: ['titleEn'],
      })
    }
  })

export const getCourseQuerySchema = z.object({
  isPublished: z.boolean().optional(),
})

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
    startDate: z.coerce
      .date({
        invalid_type_error: "That's not a date!",
      })
      .optional(),
    endDate: z.coerce
      .date({
        invalid_type_error: "That's not a date!",
      })
      .optional(),
    startTime: z
      .string()
      // .time({ message: 'error.course.startTime_invalid' })
      .optional(),
    endTime: z
      .string()
      // .time({ message: 'error.course.endTime_invalid' })
      .optional(),
    days: z.enum(courseDaysEnum).array(),
    deliveryMode: z.enum(courseDeliveryModeEnum).optional(),
    durationPeriod: z.enum(courseDurationPeriodEnum).optional(),
    durationValue: z.coerce.number().optional(),
    objective: z.string().optional(),
    curriculum: z.string().optional(),
    audience: z.enum(courseAudienceEnum).optional(),
    language: z.enum(courseLanguageEnum).optional(),
    isPublished: z.boolean().optional(),
  })
  .superRefine((val, ctx) => {
    if (!areAllOrNoneProvided(val, ['durationPeriod', 'durationValue'])) {
      ctx.addIssue({
        code: 'custom',
        message: 'Both durationPeriod and durationValue are required',
        path: ['durationPeriod'],
      })
    }
    if (!val.titleEn && !val.titleFr) {
      ctx.addIssue({
        message: 'error.course.title_required',
        code: 'custom',
        path: ['titleEn'],
      })
    }
  })

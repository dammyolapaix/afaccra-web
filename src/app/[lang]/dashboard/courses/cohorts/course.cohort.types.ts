import { z } from 'zod'
import { courseCohortSchema } from './course.cohort.schema'

export type CourseCohortType = z.infer<typeof courseCohortSchema> & {
  id: string
}

export type CourseCohortResType = {
  success: true
  cohort: CourseCohortType
}

export type CourseCohortFormType = z.infer<typeof courseCohortSchema>

import { z } from 'zod'
import { courseSchema } from './course.schema'

export type CourseFormType = z.infer<typeof courseSchema>

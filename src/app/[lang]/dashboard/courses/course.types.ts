import { z } from 'zod'
import { courseSchema } from './course.schema'

export type CourseType = z.infer<typeof courseSchema>
export type CourseFormType = z.infer<typeof courseSchema>
export type CourseResType = {
  success: true
  course: CourseType
}

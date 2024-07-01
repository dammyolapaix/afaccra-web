import { z } from 'zod'
import { courseSchema } from './course.schema'

export type CourseType = z.infer<typeof courseSchema> & {
  id: string
}
export type CourseFormType = z.infer<typeof courseSchema>
export type CourseResType = {
  success: true
  course: CourseType
}
export type CoursesResType = {
  success: true
  count: number
  courses: CourseType[]
}

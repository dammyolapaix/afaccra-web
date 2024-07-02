import { z } from 'zod'
import { courseSchema } from './course.schema'
import { CoursePriceType } from './price/course.price.types'

export type CourseType = z.infer<typeof courseSchema> & {
  id: string
  prices: CoursePriceType[]
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

import { z } from 'zod'
import { courseSchema, getCourseQuerySchema } from './course.schema'
import { CoursePriceType } from './price/course.price.types'
import { CourseScheduleType } from './schedules/course.schedule.types'
import { CourseCohortType } from './cohorts/course.cohort.types'

export type CourseType = z.infer<typeof courseSchema> & {
  id: string
  isPublished: boolean
  prices: CoursePriceType[]
  schedules: CourseScheduleType[]
  cohorts: CourseCohortType[]
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
export type GetCourseQueryType = z.infer<typeof getCourseQuerySchema>

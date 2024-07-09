import { z } from 'zod'
import { courseClassSchema } from './course.class.schema'
import { CoursePriceType } from '../price/course.price.types'
import { LevelType } from '../levels/level.types'

export type CourseClassType = z.infer<typeof courseClassSchema> & {
  id: string
  price: CoursePriceType
  level: LevelType | null
}

export type CourseClassResType = {
  success: true
  class: CourseClassType
}

export type CourseClassesResType = {
  success: true
  count: number
  classes: CourseClassType[]
}

export type CourseClassFormType = z.infer<typeof courseClassSchema>
export type CourseClassQueryTye = {
  courseId?: string
}

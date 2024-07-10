import { z } from 'zod'
import { courseClassSchema } from '../courses/classes/course.class.schema'
import { CoursePriceType } from '../courses/price/course.price.types'
import { LevelType } from '../courses/levels/level.types'

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

export type CourseClassQueryTye = {
  courseId?: string
}

import { z } from 'zod'
import { coursePriceSchema } from './course.price.schema'
import { LevelType } from '../levels/level.types'

export type CoursePriceType = z.infer<typeof coursePriceSchema> & {
  id: string
  level: LevelType | null
}

export type CoursePriceFormType = z.infer<typeof coursePriceSchema>

export type CoursePriceResType = {
  success: true
  price: CoursePriceType
}

export type CoursePricesResType = {
  success: true
  count: number
  prices: CoursePriceType[]
}

export type CoursePriceQueryTye = {
  courseId?: string
}

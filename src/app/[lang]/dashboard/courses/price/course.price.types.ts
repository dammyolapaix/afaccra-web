import { z } from 'zod'
import { coursePriceSchema } from './course.price.schema'

export type CoursePriceType = z.infer<typeof coursePriceSchema> & {
  id: string
}
export type CoursePriceResType = {
  success: true
  price: CoursePriceType
}
export type CoursePriceFormType = z.infer<typeof coursePriceSchema>

'use server'

import { revalidatePath } from 'next/cache'
import { CoursePriceFormType } from './course.price.types'
import { addCoursePrice } from './course.price.services'
import { SINGLE_COURSE_ROUTE } from '../course.routes'

export const addCoursePriceAction = async (price: CoursePriceFormType) => {
  const res = await addCoursePrice(price)

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(price.courseId))

  return res
}

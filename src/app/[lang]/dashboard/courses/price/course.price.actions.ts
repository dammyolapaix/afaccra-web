'use server'

import { revalidatePath } from 'next/cache'
import { CoursePriceFormType } from './course.price.types'
import { addCoursePrice, updateCoursePrice } from './course.price.services'
import { SINGLE_COURSE_ROUTE } from '../course.routes'

export const addCoursePriceAction = async (price: CoursePriceFormType) => {
  const res = await addCoursePrice(price)

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(price.courseId))

  return res
}

export const updateCoursePriceAction = async ({
  id,
  price,
}: {
  id: string
  price: CoursePriceFormType
}) => {
  const res = await updateCoursePrice({ id, price })

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(price.courseId))

  return res
}

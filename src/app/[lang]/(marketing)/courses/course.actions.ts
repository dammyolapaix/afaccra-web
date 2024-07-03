'use server'

import { revalidatePath } from 'next/cache'
import { purchaseCourse } from './course.services'
import { ALL_COURSES_ROUTE } from './course.routes'

export const purchaseCourseAction = async (purchase: {
  coursePriceId: string
}) => {
  const res = await purchaseCourse(purchase)

  if (!res.success) return res

  revalidatePath(ALL_COURSES_ROUTE)

  return res
}

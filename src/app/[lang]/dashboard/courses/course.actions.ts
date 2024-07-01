'use server'

import { revalidatePath } from 'next/cache'
import { CourseFormType } from './course.types'
import { addCourse, updateCourse } from './course.services'
import { ALL_COURSES_ROUTE } from './course.routes'

export const addCourseAction = async (course: CourseFormType) => {
  const res = await addCourse(course)

  if (!res.success) return res

  revalidatePath(ALL_COURSES_ROUTE)

  return res
}

export const updateCourseAction = async ({
  id,
  course,
}: {
  id: string
  course: CourseFormType
}) => {
  const res = await updateCourse({ id, course })

  if (!res.success) return res

  revalidatePath(ALL_COURSES_ROUTE)

  return res
}

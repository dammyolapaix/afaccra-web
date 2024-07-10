'use server'

import { revalidatePath } from 'next/cache'
import { CourseClassFormType } from './course.class.types'
import { addCourseClass, updateCourseClass } from './course.class.services'
import { SINGLE_COURSE_ROUTE } from '../course.routes'
import { SINGLE_CLASS_ROUTE } from '../../classes/class.routes'

export const addCourseClassAction = async (
  classFormInput: CourseClassFormType,
  courseId: string
) => {
  const res = await addCourseClass(classFormInput)

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(courseId))

  return res
}

export const updateCourseClassAction = async ({
  id,
  classFormInput,
  courseId,
}: {
  id: string
  classFormInput: CourseClassFormType
  courseId: string
}) => {
  const res = await updateCourseClass({ id, classFormInput })

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(courseId))
  revalidatePath(SINGLE_CLASS_ROUTE(id))

  return res
}

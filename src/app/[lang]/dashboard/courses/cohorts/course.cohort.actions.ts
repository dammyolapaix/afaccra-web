'use server'

import { revalidatePath } from 'next/cache'
import { CourseCohortFormType } from './course.cohort.types'
import { addCourseCohort, updateCourseCohort } from './course.cohort.services'
import { SINGLE_COURSE_ROUTE } from '../course.routes'

export const addCourseCohortAction = async (cohort: CourseCohortFormType) => {
  const res = await addCourseCohort(cohort)

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(cohort.courseId))

  return res
}

export const updateCourseCohortAction = async ({
  id,
  cohort,
}: {
  id: string
  cohort: CourseCohortFormType
}) => {
  const res = await updateCourseCohort({ id, cohort })

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(cohort.courseId))

  return res
}

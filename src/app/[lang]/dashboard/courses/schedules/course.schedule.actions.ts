'use server'

import { revalidatePath } from 'next/cache'
import { CourseScheduleFormType } from './course.schedule.types'
import {
  addCourseSchedule,
  updateCourseSchedule,
} from './course.schedule.services'
import { SINGLE_COURSE_ROUTE } from '../course.routes'

export const addCourseScheduleAction = async (
  schedule: CourseScheduleFormType
) => {
  const res = await addCourseSchedule(schedule)

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(schedule.courseId))

  return res
}

export const updateCourseScheduleAction = async ({
  id,
  schedule,
}: {
  id: string
  schedule: CourseScheduleFormType
}) => {
  const res = await updateCourseSchedule({ id, schedule })

  if (!res.success) return res

  revalidatePath(SINGLE_COURSE_ROUTE(schedule.courseId))

  return res
}

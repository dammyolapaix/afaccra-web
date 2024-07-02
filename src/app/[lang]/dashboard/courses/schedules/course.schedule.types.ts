import { z } from 'zod'
import { courseScheduleSchema } from './course.schedule.schema'

export type CourseScheduleType = z.infer<typeof courseScheduleSchema> & {
  id: string
}
export type CourseScheduleResType = {
  success: true
  schedule: CourseScheduleType
}
export type CourseScheduleFormType = z.infer<typeof courseScheduleSchema>

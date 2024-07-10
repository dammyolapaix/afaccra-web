import { z } from 'zod'
import { courseClassSchema } from './course.class.schema'

export type CourseClassFormType = z.infer<typeof courseClassSchema>

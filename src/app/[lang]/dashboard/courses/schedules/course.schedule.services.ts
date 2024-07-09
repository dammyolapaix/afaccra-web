import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import {
  CourseScheduleFormType,
  CourseScheduleResType,
} from './course.schedule.types'

const endPoint = '/schedules'

export const addCourseSchedule = async (
  schedule: CourseScheduleFormType
): Promise<CourseScheduleResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.post<CourseScheduleResType>(
      endPoint,
      schedule,
      {
        headers: {
          Authorization: cookies().has('token')
            ? `Bearer ${cookies().get('token')?.value}`
            : undefined,
        },
      }
    )

    return data
  } catch (error) {
    return (error as AxiosError).response?.data as ErrorResType
  }
}

export const updateCourseSchedule = async ({
  id,
  schedule,
}: {
  id: string
  schedule: CourseScheduleFormType
}): Promise<CourseScheduleResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.patch<CourseScheduleResType>(
      `${endPoint}/${id}`,
      schedule,
      {
        headers: {
          Authorization: cookies().has('token')
            ? `Bearer ${cookies().get('token')?.value}`
            : undefined,
        },
      }
    )

    return data
  } catch (error) {
    return (error as AxiosError).response?.data as ErrorResType
  }
}

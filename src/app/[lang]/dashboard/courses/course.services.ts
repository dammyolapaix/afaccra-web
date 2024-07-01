import { makeRequest } from '@/lib'
import { CourseFormType, CourseResType } from './course.types'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

const endPoint = '/courses'

const headers = {
  Authorization: cookies().has('token')
    ? `Bearer ${cookies().get('token')?.value}`
    : undefined,
}

export const addCourse = async (
  course: CourseFormType
): Promise<CourseResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.post<CourseResType>(
      `${endPoint}`,
      course,
      {
        headers,
      }
    )

    return data
  } catch (error) {
    return (error as AxiosError).response?.data as ErrorResType
  }
}

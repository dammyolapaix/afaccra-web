import { makeRequest } from '@/lib'
import { CourseFormType, CourseResType, CoursesResType } from './course.types'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

const endPoint = '/courses'

export const addCourse = async (
  course: CourseFormType
): Promise<CourseResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.post<CourseResType>(
      `${endPoint}`,
      course,
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

export const getCourses = async (): Promise<CoursesResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.get<CoursesResType>(`${endPoint}`, {
      headers: {
        Authorization: cookies().has('token')
          ? `Bearer ${cookies().get('token')?.value}`
          : undefined,
      },
    })

    return data
  } catch (error) {
    return (error as AxiosError).response?.data as ErrorResType
  }
}

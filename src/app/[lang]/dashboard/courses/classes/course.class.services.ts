import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import { CourseClassFormType } from './course.class.types'
import { CourseClassResType } from '../../classes/classes.types'

const endPoint = '/classes'

export const addCourseClass = async (
  classFormInput: CourseClassFormType
): Promise<CourseClassResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.post<CourseClassResType>(
      endPoint,
      classFormInput,
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

export const updateCourseClass = async ({
  id,
  classFormInput,
}: {
  id: string
  classFormInput: CourseClassFormType
}): Promise<CourseClassResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.patch<CourseClassResType>(
      `${endPoint}/${id}`,
      classFormInput,
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

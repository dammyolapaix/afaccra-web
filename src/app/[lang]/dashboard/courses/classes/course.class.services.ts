import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import {
  CourseClassesResType,
  CourseClassFormType,
  CourseClassQueryTye,
  CourseClassResType,
} from './course.class.types'
import { getQueryStr } from '@/lib/utils'

const endPoint = '/classes'

export const getClasses = async (
  query?: CourseClassQueryTye
): Promise<CourseClassesResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.get<CourseClassesResType>(
      query ? `${endPoint}${getQueryStr(query)}` : endPoint,
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

import { ErrorResType } from '@/types'
import { CourseClassesResType, CourseClassQueryTye } from './classes.types'
import { makeRequest } from '@/lib'
import { getQueryStr } from '@/lib/utils'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

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

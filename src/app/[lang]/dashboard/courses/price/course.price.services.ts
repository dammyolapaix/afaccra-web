import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import { CoursePriceFormType, CoursePriceResType } from './course.price.types'

const endPoint = (courseId: string) => `/courses/${courseId}/prices`

export const addCoursePrice = async (
  price: CoursePriceFormType
): Promise<CoursePriceResType | ErrorResType> => {
  const { courseId, ...rest } = price

  try {
    const { data } = await makeRequest.post<CoursePriceResType>(
      `${endPoint(courseId)}`,
      rest,
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

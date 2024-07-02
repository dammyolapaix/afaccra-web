import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import { CoursePriceFormType, CoursePriceResType } from './course.price.types'

const createEndPoint = (courseId: string) => `/courses/${courseId}/prices`
const endPoint = '/prices'

export const addCoursePrice = async (
  price: CoursePriceFormType
): Promise<CoursePriceResType | ErrorResType> => {
  const { courseId, ...rest } = price

  try {
    const { data } = await makeRequest.post<CoursePriceResType>(
      `${createEndPoint(courseId)}`,
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

export const updateCoursePrice = async ({
  id,
  price,
}: {
  id: string
  price: CoursePriceFormType
}): Promise<CoursePriceResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.patch<CoursePriceResType>(
      `${endPoint}/${id}`,
      price,
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

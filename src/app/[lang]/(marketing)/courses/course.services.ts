import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { CoursePurchaseTransactionInitType } from './course.types'
import { AxiosError } from 'axios'
import { cookies } from 'next/headers'

const endPoint = '/courses/purchases'

export const purchaseCourse = async (purchase: {
  coursePriceId: string
}): Promise<CoursePurchaseTransactionInitType | ErrorResType> => {
  try {
    const { data } = await makeRequest.post<CoursePurchaseTransactionInitType>(
      endPoint,
      purchase,
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

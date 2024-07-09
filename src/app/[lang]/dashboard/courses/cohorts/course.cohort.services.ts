import { makeRequest } from '@/lib'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'
import {
  CourseCohortFormType,
  CourseCohortResType,
} from './course.cohort.types'

const endPoint = '/cohorts'

export const addCourseCohort = async (
  cohort: CourseCohortFormType
): Promise<CourseCohortResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.post<CourseCohortResType>(
      endPoint,
      cohort,
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

export const updateCourseCohort = async ({
  id,
  cohort,
}: {
  id: string
  cohort: CourseCohortFormType
}): Promise<CourseCohortResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.patch<CourseCohortResType>(
      `${endPoint}/${id}`,
      cohort,
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

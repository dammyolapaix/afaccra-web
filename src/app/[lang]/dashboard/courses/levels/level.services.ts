import { makeRequest } from '@/lib'
import { LevelsResType } from './level.types'
import { ErrorResType } from '@/types'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

const endPoint = '/levels'

export const getLevels = async (): Promise<LevelsResType | ErrorResType> => {
  try {
    const { data } = await makeRequest.get<LevelsResType>(endPoint, {
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

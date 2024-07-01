import { ErrorResType } from '@/types'
import { AuthResType, LoginInputType } from './auth.types'

export const login = async (userInput: LoginInputType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/login`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      }
    )

    const data = (await res.json()) as AuthResType

    return data
  } catch (error) {
    return error as ErrorResType
  }
}

import jwt from 'jsonwebtoken'
import { UserType } from '@/types'
import { cookies } from 'next/headers'

/**
 * Auth
 */

export const encryptUserInfo = ({ user }: { user: UserType }) =>
  jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

export const decryptUserInfo = ({ session }: { session: string }): UserType => {
  const payload = jwt.verify(
    session,
    process.env.JWT_SECRET!
  ) as jwt.JwtPayload & { user: UserType }

  return payload.user
}

export const getAuthUser = async () => {
  const session = cookies().get('session')?.value
  if (!session) return null

  return decryptUserInfo({ session })
}

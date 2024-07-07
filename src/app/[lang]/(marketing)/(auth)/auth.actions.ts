'use server'

import { encryptUserInfo } from '@/app/utils'
import { UserType } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const authSessionAction = async ({
  user,
  redirectPath,
}: {
  user: UserType
  redirectPath?: string
}) => {
  const session = encryptUserInfo({ user })
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30d

  cookies().set('session', session, { expires, httpOnly: true })

  redirect(redirectPath ? redirectPath : '/')
}

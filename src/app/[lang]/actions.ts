'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const toggleLanguageAction = async ({
  lang,
  pathname,
}: {
  lang: 'en' | 'fr'
  pathname: string
}) => {
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 * 12) // ~ 1y

  cookies().set('lang', lang, { expires, httpOnly: true })

  redirect(`/${lang}${pathname}`)
}

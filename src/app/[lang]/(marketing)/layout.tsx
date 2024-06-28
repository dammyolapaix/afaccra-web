import Navbar from '@/components/navbar'
import { getLocale } from '@/locales'
import { cookies } from 'next/headers'

export default async function layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: 'en' | 'fr' }
}>) {
  const cookieStore = cookies()
  const hasAuthToken = cookieStore.has('token')

  const locale = await getLocale(lang)

  return (
    <>
      <Navbar hasAuthToken={hasAuthToken} locale={locale} />
      {children}
    </>
  )
}

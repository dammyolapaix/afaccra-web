import { getAuthUser } from '@/app/utils'
import Navbar from '@/components/navbar'
import { getLocale } from '@/locales'

export default async function layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: 'en' | 'fr' }
}>) {
  const locale = await getLocale(lang)
  const authUser = await getAuthUser()

  const userIsAuth = authUser !== null

  return (
    <>
      <Navbar userIsAuth={userIsAuth} locale={locale} />
      {children}
    </>
  )
}

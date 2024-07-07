import { getAuthUser } from '@/app/utils'
import DashboardLayout from '@/components/dashboard-layout'
import { getLocale } from '@/locales'
import { UserType } from '@/types'

export default async function Layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: 'en' | 'fr' }
}>) {
  const locale = await getLocale(lang)

  const authUser = (await getAuthUser()) as UserType

  return (
    <DashboardLayout locale={locale} authUser={authUser}>
      {children}
    </DashboardLayout>
  )
}

import DashboardLayout from '@/components/dashboard-layout'
import { getLocale } from '@/locales'

export default async function Layout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode
  params: { lang: 'en' | 'fr' }
}>) {
  const locale = await getLocale(lang)

  return <DashboardLayout locale={locale}>{children}</DashboardLayout>
}

import { getLocale } from '@/locales'
import Courses from './components/courses'

export default async function DashboardCoursesPage({
  params: { lang },
}: Readonly<{
  params: { lang: 'en' | 'fr' }
}>) {
  const locale = await getLocale(lang)

  return <Courses locale={locale} lang={lang} />
}

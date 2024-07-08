import { getLocale } from '@/locales'
import CourseForm from '../components/course-form'

export default async function DashboardAddCoursePage({
  params: { lang },
}: {
  params: {
    lang: 'en' | 'fr'
  }
}) {
  const locale = await getLocale(lang)

  return <CourseForm locale={locale} />
}

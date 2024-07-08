import { getLocale } from '@/locales'
import Course from '../components/course'
import { getSingleCourseById } from '../course.services'
import { CourseResType } from '../course.types'

export default async function DashboardSingleCoursePage({
  params: { id, lang },
}: {
  params: {
    id: string
    lang: 'en' | 'fr'
  }
}) {
  const { course } = (await getSingleCourseById({ id })) as CourseResType

  const locale = await getLocale(lang)

  return <Course course={course} locale={locale} lang={lang} />
}

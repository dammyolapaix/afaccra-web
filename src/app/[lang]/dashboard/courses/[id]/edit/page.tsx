import { getLocale } from '@/locales'
import CourseForm from '../../components/course-form'
import { getSingleCourseById } from '../../course.services'
import { CourseResType } from '../../course.types'

export default async function DashboardEditCoursePage({
  params: { id, lang },
}: {
  params: {
    id: string
    lang: 'en' | 'fr'
  }
}) {
  const { course } = (await getSingleCourseById({ id })) as CourseResType

  const locale = await getLocale(lang)

  return <CourseForm course={course} locale={locale} />
}

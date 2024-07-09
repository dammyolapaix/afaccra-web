import { getLocale } from '@/locales'
import Course from '../components/course'
import { getSingleCourseById } from '../course.services'
import { CourseResType } from '../course.types'
import { LevelsResType, LevelType } from '../levels/level.types'
import { getLevels } from '../levels/level.services'

export default async function DashboardSingleCoursePage({
  params: { id, lang },
  searchParams,
}: {
  params: {
    id: string
    lang: 'en' | 'fr'
  }
  searchParams?: { tab?: 'course' | 'price' | 'schedule' }
}) {
  const { course } = (await getSingleCourseById({ id })) as CourseResType

  const locale = await getLocale(lang)

  let levels: LevelType[] | undefined = undefined

  if (searchParams?.tab === 'price') {
    const { levels: levelsRes } = (await getLevels()) as LevelsResType
    levels = levelsRes
  }

  return (
    <Course
      course={course}
      locale={locale}
      lang={lang}
      levels={levels}
      searchParams={searchParams}
    />
  )
}

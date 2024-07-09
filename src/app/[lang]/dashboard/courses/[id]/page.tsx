import { getLocale } from '@/locales'
import Course from '../components/course'
import { getSingleCourseById } from '../course.services'
import { CourseResType } from '../course.types'
import { LevelsResType, LevelType } from '../levels/level.types'
import { getLevels } from '../levels/level.services'
import { getClasses } from '../classes/course.class.services'
import {
  CourseClassesResType,
  CourseClassResType,
  CourseClassType,
} from '../classes/course.class.types'

type SearchParamsType = {
  tab?: 'course' | 'price' | 'schedule' | 'class'
}

export default async function DashboardSingleCoursePage({
  params: { id, lang },
  searchParams,
}: {
  params: {
    id: string
    lang: 'en' | 'fr'
  }
  searchParams?: SearchParamsType
}) {
  const { course } = (await getSingleCourseById({ id })) as CourseResType

  const locale = await getLocale(lang)

  let levels: LevelType[] | undefined = undefined
  let classes: CourseClassType[] | undefined = undefined

  if (searchParams?.tab === 'price') {
    const { levels: levelsRes } = (await getLevels()) as LevelsResType
    levels = levelsRes
  }

  if (searchParams?.tab === 'class') {
    const { classes: classesRes } = (await getClasses({
      courseId: id,
    })) as CourseClassesResType
    classes = classesRes
  }

  return (
    <Course
      course={course}
      locale={locale}
      lang={lang}
      levels={levels}
      classes={classes}
      searchParams={searchParams}
    />
  )
}

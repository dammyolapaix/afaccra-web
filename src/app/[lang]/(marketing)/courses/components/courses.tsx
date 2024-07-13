import { getCourses } from '@/app/[lang]/dashboard/courses/course.services'
import { CoursesResType } from '@/app/[lang]/dashboard/courses/course.types'
import NotFound from '@/components/not-found'
import CoursesItem from './courses-item'
import { getAuthUser } from '@/app/utils'

export default async function Courses() {
  const { count, courses } = (await getCourses({
    isPublished: true,
    prices: { classes: { displayOnWebsite: true } },
    cohorts: { isActive: true },
  })) as CoursesResType
  const user = await getAuthUser()

  return (
    <section className="mt-20">
      {count > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {courses.map((course) => (
            <CoursesItem key={course.id} course={course} user={user} />
          ))}
        </div>
      ) : (
        <NotFound info={{ message: 'No Course found' }} />
      )}
    </section>
  )
}

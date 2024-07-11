import { getCourses } from '@/app/[lang]/dashboard/courses/course.services'
import {
  CourseType,
  CoursesResType,
} from '@/app/[lang]/dashboard/courses/course.types'
import NotFound from '@/components/not-found'
import CoursesItem from './courses-item'

export default async function Courses() {
  const { count, courses } = (await getCourses({
    isPublished: true,
    prices: { classes: { displayOnWebsite: true } },
    cohorts: { isActive: true },
  })) as CoursesResType

  return (
    <section className="mt-20">
      {count > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {courses.map((course) => (
            <CoursesItem key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <NotFound info={{ message: 'No Course found' }} />
      )}
    </section>
  )
}

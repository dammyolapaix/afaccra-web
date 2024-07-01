import CourseDetails from '../components/course-details'
import { getSingleCourseById } from '../course.services'
import { CourseResType } from '../course.types'

export default async function DashboardSingleCoursePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { course } = (await getSingleCourseById({ id })) as CourseResType
  return <CourseDetails course={course} />
}

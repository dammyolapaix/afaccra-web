import CourseForm from '../../components/course-form'
import { getSingleCourseById } from '../../course.services'
import { CourseResType } from '../../course.types'

export default async function DashboardEditCoursePage({
  params: { id },
}: {
  params: { id: string }
}) {
  const { course } = (await getSingleCourseById({ id })) as CourseResType

  return <CourseForm course={course} />
}

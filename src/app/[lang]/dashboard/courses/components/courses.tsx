import { getCourses } from '../course.services'
import { CoursesResType } from '../course.types'
import CoursesTable from './courses-table'

export default async function Courses() {
  const { count, courses } = (await getCourses()) as CoursesResType

  return <CoursesTable count={count} courses={courses} />
}

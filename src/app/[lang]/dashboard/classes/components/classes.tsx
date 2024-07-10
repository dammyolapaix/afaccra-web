import { getClasses } from '../class.services'
import { CourseClassesResType } from '../classes.types'
import ClassesTable from './classes-table'

export default async function Classes() {
  const { count, classes } = (await getClasses({})) as CourseClassesResType

  return <ClassesTable classes={classes} count={count} />
}

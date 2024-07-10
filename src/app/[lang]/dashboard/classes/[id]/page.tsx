import { getSingleClassById } from '../class.services'
import { CourseClassResType } from '../classes.types'
import Class from '../components/class'

export default async function SingleClassPage({
  params: { id },
}: {
  params: {
    id: string
  }
}) {
  const { class: classInfo } = (await getSingleClassById({
    id,
  })) as CourseClassResType

  return <Class classInfo={classInfo} />
}

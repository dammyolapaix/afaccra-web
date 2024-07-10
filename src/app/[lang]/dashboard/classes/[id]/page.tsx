import { getCoursePrices } from '../../courses/price/course.price.services'
import {
  CoursePricesResType,
  CoursePriceType,
} from '../../courses/price/course.price.types'
import { getSingleClassById } from '../class.services'
import { CourseClassResType } from '../classes.types'
import Class from '../components/class'

type SearchParamsType = {
  tab?: 'class'
}

export default async function SingleClassPage({
  params: { id },
  searchParams,
}: {
  params: {
    id: string
  }
  searchParams?: SearchParamsType
}) {
  const { class: classInfo } = (await getSingleClassById({
    id,
  })) as CourseClassResType

  let prices: CoursePriceType[] | undefined = undefined

  if (searchParams?.tab === 'class' && classInfo) {
    const { prices: pricesRes } = (await getCoursePrices({
      courseId: classInfo.price.courseId,
    })) as CoursePricesResType
    prices = pricesRes
  }

  return <Class classInfo={classInfo} prices={prices} />
}

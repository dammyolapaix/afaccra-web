import { TableCell, TableRow } from '@/components/ui/table'
import CourseClassForm from './course-class-form'
import { formatToMoney } from '@/lib/utils'
import { useSearchParamsQuery } from '@/hooks'
import { CourseType } from '../../course.types'
import { CoursePriceType } from '../../price/course.price.types'
import { CourseClassType } from '../../../classes/classes.types'

export default function CourseClassTableItem({
  classInfo,
  prices,
}: {
  classInfo: CourseClassType
  prices: CoursePriceType[]
}) {
  const audienceParams = useSearchParamsQuery({
    query: 'audience',
    action: 'get',
  }) as CourseType['audience']

  return (
    <TableRow>
      <TableCell className="font-medium">{classInfo.name}</TableCell>
      {audienceParams === 'adults' && (
        <TableCell className="font-medium">{classInfo.level!.name}</TableCell>
      )}
      {audienceParams === 'kids' && (
        <TableCell className="font-medium">{classInfo.price.child}</TableCell>
      )}
      <TableCell className="font-medium">
        {(classInfo.displayOnWebsite as unknown as boolean) === true
          ? 'Yes'
          : 'No'}
      </TableCell>
      <TableCell className="font-medium">
        {formatToMoney(classInfo.price.amount)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <CourseClassForm classInfo={classInfo} prices={prices} />
      </TableCell>
    </TableRow>
  )
}

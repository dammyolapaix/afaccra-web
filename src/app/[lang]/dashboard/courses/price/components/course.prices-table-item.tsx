import { TableCell, TableRow } from '@/components/ui/table'
import { CoursePriceType } from '../course.price.types'
import { formatToMoney } from '@/lib/utils'
import CoursePriceForm from './course-price-form'
import { LevelType } from '../../levels/level.types'
import { useSearchParamsQuery } from '@/hooks'
import { CourseType } from '../../course.types'

export default function CoursePricesTableItem({
  price,
  levels,
}: {
  price: CoursePriceType
  levels: LevelType[]
}) {
  const { amount, child, level } = price

  const audienceParams = useSearchParamsQuery({
    query: 'audience',
    action: 'get',
  }) as CourseType['audience']

  return (
    <TableRow>
      <TableCell className="font-medium">{formatToMoney(amount)}</TableCell>
      {audienceParams === 'adults' && (
        <TableCell className="hidden sm:table-cell">
          {level ? level.name : '-'}
        </TableCell>
      )}

      {audienceParams === 'kids' && (
        <TableCell className="hidden sm:table-cell">
          {child ? child : '-'}
        </TableCell>
      )}

      <TableCell className="hidden sm:table-cell">
        <CoursePriceForm price={price} levels={levels} />
      </TableCell>
    </TableRow>
  )
}

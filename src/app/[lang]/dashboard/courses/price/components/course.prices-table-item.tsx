import { TableCell, TableRow } from '@/components/ui/table'
import { CoursePriceType } from '../course.price.types'
import { formatToMoney } from '@/lib/utils'
import CoursePriceForm from './course-price-form'
import { LevelType } from '../../levels/level.types'

export default function CoursePricesTableItem({
  price,
  levels,
}: {
  price: CoursePriceType
  levels: LevelType[]
}) {
  const { amount, child, level } = price

  return (
    <TableRow>
      <TableCell className="font-medium">{formatToMoney(amount)}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {level ? level.name : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {child ? child : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <CoursePriceForm price={price} levels={levels} />
      </TableCell>
    </TableRow>
  )
}

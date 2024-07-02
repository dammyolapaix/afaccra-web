import { TableCell, TableRow } from '@/components/ui/table'
import { CoursePriceType } from '../course.price.types'
import { formatToMoney } from '@/lib/utils'
import CoursePriceForm from './course-price-form'

export default function CoursePricesTableItem({
  price,
}: {
  price: CoursePriceType
}) {
  const { amount, child, level } = price
  return (
    <TableRow>
      <TableCell className="font-medium">{formatToMoney(amount)}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {level ? level : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {child ? child : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <CoursePriceForm price={price} />
      </TableCell>
    </TableRow>
  )
}

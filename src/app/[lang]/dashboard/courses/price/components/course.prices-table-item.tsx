import { TableCell, TableRow } from '@/components/ui/table'
import { CoursePriceType } from '../course.price.types'
import { formatToMoney } from '@/lib/utils'

export default function CoursePricesTableItem({
  price: { amount, child, level },
}: {
  price: CoursePriceType
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{formatToMoney(amount)}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {level ? level : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {child ? child : '-'}
      </TableCell>
    </TableRow>
  )
}

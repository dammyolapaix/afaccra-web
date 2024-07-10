import { CourseClassType } from '../classes.types'
import { TableCell, TableRow } from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatToMoney } from '@/lib/utils'
import { SINGLE_CLASS_ROUTE } from '../class.routes'

export default function ClassesTableItem({
  classInfo: { displayOnWebsite, id, level, name, price },
}: {
  classInfo: CourseClassType
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {price.level ? price.level.name : level ? level.name : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {price.child ? 'Child' : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {formatToMoney(price.amount)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {(displayOnWebsite as unknown as boolean) === true ? 'Yes' : 'No'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <MoreHorizontal className="h-3.5 w-3.5" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={SINGLE_CLASS_ROUTE(id)}>View Class</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

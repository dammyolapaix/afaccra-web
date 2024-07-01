import { TableCell, TableRow } from '@/components/ui/table'
import { CourseType } from '../course.types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { MoreHorizontal } from 'lucide-react'
import { SINGLE_COURSE_ROUTE } from '../course.routes'
import { Button } from '@/components/ui/button'

export default function CoursesTableItem({
  course: {
    id,
    titleEn,
    titleFr,
    language,
    deliveryMode,
    isPublished,
    audience,
  },
}: {
  course: CourseType
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">{titleEn}</TableCell>
      <TableCell className="hidden sm:table-cell">
        {language ? language : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {deliveryMode ? deliveryMode : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {audience ? audience : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {isPublished ? 'published' : 'draft'}
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
              <Link href={SINGLE_COURSE_ROUTE(id)}>View Course</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

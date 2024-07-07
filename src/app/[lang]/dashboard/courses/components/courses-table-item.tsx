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
import { EDIT_COURSE_ROUTE, SINGLE_COURSE_ROUTE } from '../course.routes'
import { Button } from '@/components/ui/button'
import { LocaleType } from '@/types'

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
  locale: {
    utils: locale_utils,
    pages: {
      dashboard: { courses: locale_course },
    },
  },
  lang,
}: {
  course: CourseType
  locale: LocaleType
  lang: 'en' | 'fr'
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {lang === 'fr' && titleFr ? titleFr : titleEn}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {language
          ? language === 'english'
            ? locale_utils.english
            : locale_utils.french
          : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {deliveryMode ? deliveryMode : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {audience
          ? audience === 'adults'
            ? locale_utils.adults
            : locale_utils.kids
          : '-'}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        {isPublished ? locale_utils.published : locale_utils.draft}
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
              <Link href={SINGLE_COURSE_ROUTE(id)}>
                {locale_course.actions.view_course}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={EDIT_COURSE_ROUTE(id)}>
                {locale_course.actions.edit_course}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
}

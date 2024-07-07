import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import Link from 'next/link'
import { CourseType } from '../course.types'
import { ADD_COURSE_ROUTE } from '../course.routes'
import CoursesTableItem from './courses-table-item'
import { LocaleType } from '@/types'

export default function CoursesTable({
  count,
  courses,
  locale,
  lang,
}: {
  count: number
  courses: CourseType[]
  locale: LocaleType
  lang: 'en' | 'fr'
}) {
  const {
    pages: {
      dashboard: { courses: locale_course },
    },
  } = locale

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="default" className="gap-1 text-sm" asChild>
            <Link href={ADD_COURSE_ROUTE}>
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">
                {locale_course.actions.add_course}
              </span>
            </Link>
          </Button>
        </div>
      </div>
      {count > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>
              {locale_course.table_title} ({count})
            </CardTitle>
            <CardDescription>{locale_course.table_description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{locale_course.course_title}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {locale_course.language}
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {locale_course.delivery_mode}
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {locale_course.audience}
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {locale_course.status}
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {locale_course.table_actions}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <CoursesTableItem
                    key={course.id}
                    course={course}
                    locale={locale}
                    lang={lang}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <>No course found</>
      )}
    </>
  )
}

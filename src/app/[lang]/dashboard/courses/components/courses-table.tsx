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

export default function PoliciesTable({
  count,
  courses,
}: {
  count: number
  courses: CourseType[]
}) {
  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="default" className="gap-1 text-sm" asChild>
            <Link href={ADD_COURSE_ROUTE}>
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Add Course</span>
            </Link>
          </Button>
        </div>
      </div>
      {count > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Courses ({count})</CardTitle>
            <CardDescription>Your courses list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course title</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Language
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Delivery Mode
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Audience
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <CoursesTableItem key={course.id} course={course} />
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

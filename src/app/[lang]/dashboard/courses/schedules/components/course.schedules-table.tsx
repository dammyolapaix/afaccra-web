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
import CourseSchedulesTableItem from './course.schedules-table-item'
import { CourseScheduleType } from '../course.schedule.types'
import NotFound from '@/components/not-found'
import CourseScheduleForm from './course-schedule-form'

export default function CourseSchedulesTable({
  schedules,
}: {
  schedules: CourseScheduleType[]
}) {
  return (
    <>
      <div className="flex items-center mb-3">
        <div className="ml-auto flex items-center gap-2">
          <CourseScheduleForm />
        </div>
      </div>
      {schedules.length > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Course Schedules</CardTitle>
            <CardDescription>The course schedules list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schedules.map((schedule) => (
                  <CourseSchedulesTableItem
                    key={schedule.id}
                    schedule={schedule}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <NotFound
          info={{
            message: 'No schedule found',
            description: 'Add a new schedule for this course',
            modal: <CourseScheduleForm />,
          }}
        />
      )}
    </>
  )
}

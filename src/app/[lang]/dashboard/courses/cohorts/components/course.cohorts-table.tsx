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
import CourseCohortsTableItem from './course.cohorts-table-item'
import { CourseCohortType } from '../course.cohort.types'
import NotFound from '@/components/not-found'
import CourseCohortForm from './course-cohort-form'

export default function CourseCohortsTable({
  cohorts,
}: {
  cohorts: CourseCohortType[]
}) {
  return (
    <>
      <div className="flex items-center mb-3">
        <div className="ml-auto flex items-center gap-2">
          <CourseCohortForm />
        </div>
      </div>
      {cohorts.length > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Course Cohorts</CardTitle>
            <CardDescription>The course cohorts list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Starting Date</TableHead>
                  <TableHead>Ending Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohorts.map((cohort) => (
                  <CourseCohortsTableItem key={cohort.id} cohort={cohort} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <NotFound
          info={{
            message: 'No cohort found',
            description: 'Add a new cohort for this course',
            modal: <CourseCohortForm />,
          }}
        />
      )}
    </>
  )
}

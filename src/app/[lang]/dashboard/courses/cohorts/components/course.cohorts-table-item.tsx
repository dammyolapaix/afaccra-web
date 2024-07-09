import { TableCell, TableRow } from '@/components/ui/table'
import { CourseCohortType } from '../course.cohort.types'
import CourseCohortForm from './course-cohort-form'
import { convertTimeToAMPM } from '@/lib/utils'
import { format } from 'date-fns'

export default function CourseCohortsTableItem({
  cohort,
}: {
  cohort: CourseCohortType
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {format(cohort.startDate, 'PPP')}
      </TableCell>
      <TableCell className="font-medium">
        {format(cohort.endDate, 'PPP')}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <CourseCohortForm cohort={cohort} />
      </TableCell>
    </TableRow>
  )
}

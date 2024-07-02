import { TableCell, TableRow } from '@/components/ui/table'
import { CourseScheduleType } from '../course.schedule.types'
import CourseScheduleForm from './course-schedule-form'
import { convertTimeToAMPM } from '@/lib/utils'

export default function CourseSchedulesTableItem({
  schedule,
}: {
  schedule: CourseScheduleType
}) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {convertTimeToAMPM(schedule.time)}
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <CourseScheduleForm schedule={schedule} />
      </TableCell>
    </TableRow>
  )
}

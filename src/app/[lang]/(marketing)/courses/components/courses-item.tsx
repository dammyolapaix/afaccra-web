import { differenceInHours } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { convertTimeToAMPM, formatToMoney, timeToDate } from '@/lib/utils'
import { CourseType } from '@/app/[lang]/dashboard/courses/course.types'

export default function CoursesItem({
  course: {
    titleEn,
    startTime,
    endTime,
    durationPeriod,
    durationValue,
    days,
    prices,
  },
}: {
  course: CourseType
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleEn}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          {differenceInHours(
            new Date(timeToDate(endTime!)),
            new Date(timeToDate(startTime!))
          )}
          h
        </div>
        <div className="">{`${days!.length} times a week (${days
          .map((day) => day.charAt(0).toUpperCase())
          .join(' ')})`}</div>
        <div className="">{`${convertTimeToAMPM(
          startTime!
        )} - ${convertTimeToAMPM(endTime!)}`}</div>
        <div className="">{`${durationValue} ${durationPeriod}`}</div>
        <div className="">
          {prices.map(({ amount, id, level }) => (
            <div key={id}>
              {level} - {formatToMoney(amount)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { differenceInHours } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { convertTimeToAMPM, formatToMoney, timeToDate } from '@/lib/utils'
import { CourseType } from '@/app/[lang]/dashboard/courses/course.types'
import CoursePurchase from './course-purchase'
import { LevelType } from '@/app/[lang]/dashboard/courses/levels/level.types'

export default function CoursesItem({ course }: { course: CourseType }) {
  const { titleEn, days, prices } = course

  const getLevelClass = (levelName: LevelType['name']) =>
    prices.filter(
      ({ level, classes }) => level?.name === levelName && classes.length > 0
    )[0]

  const A1A2Class = getLevelClass('A1/A2')
  const B1B2Class = getLevelClass('B1/B2')
  const C1C2Class = getLevelClass('C1/C2')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleEn}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div>
          {differenceInHours(
            new Date(timeToDate(endTime!)),
            new Date(timeToDate(startTime!))
          )}
          h
        </div> */}
        <div className="">{`${days!.length} times a week (${days
          .map((day) => day.charAt(0).toUpperCase())
          .join(' ')})`}</div>
        {/* <div className="">{`${convertTimeToAMPM(
          startTime!
        )} - ${convertTimeToAMPM(endTime!)}`}</div>
        <div className="">{`${durationValue} ${durationPeriod}`}</div> */}
        {A1A2Class && (
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                {A1A2Class.level?.name} - {formatToMoney(A1A2Class.amount)}
              </div>

              <CoursePurchase
                purchase={{
                  classId: A1A2Class.classes[0].id,
                  cohortId: course.cohorts[0].id,
                }}
              />
            </div>
          </div>
        )}
        {B1B2Class && (
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                {B1B2Class.level?.name} - {formatToMoney(B1B2Class.amount)}
              </div>

              <CoursePurchase
                purchase={{
                  classId: B1B2Class.classes[0].id,
                  cohortId: course.cohorts[0].id,
                }}
              />
            </div>
          </div>
        )}
        {C1C2Class && (
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                {C1C2Class.level?.name} - {formatToMoney(C1C2Class.amount)}
              </div>

              <CoursePurchase
                purchase={{
                  classId: C1C2Class.classes[0].id,
                  cohortId: course.cohorts[0].id,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseType } from '../course.types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { marked } from 'marked'

export default function CourseDetails({
  course: {
    titleEn,
    titleFr,
    days,
    id,
    audience,
    curriculum,
    deliveryMode,
    durationPeriod,
    durationValue,
    endDate,
    endTime,
    language,
    objective,
    startDate,
    startTime,
  },
}: {
  course: CourseType
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Title (English)</Label>
            <Input disabled value={titleEn ? titleEn : ''} className="mt-3" />
          </div>
          <div className="w-full">
            <Label>Title (French)</Label>
            <Input disabled value={titleFr ? titleFr : ''} className="mt-3" />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Language</Label>
            <Input disabled value={language ? language : ''} className="mt-3" />
          </div>
          <div className="w-full">
            <Label>Delivery Mode</Label>
            <Input
              disabled
              value={deliveryMode ? deliveryMode : ''}
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Days</Label>
            <Input
              disabled
              value={days ? days.toString() : ''}
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <Label>Audience</Label>
            <Input disabled value={audience ? audience : ''} className="mt-3" />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Start Time</Label>
            <Input
              disabled
              value={startTime ? startTime : ''}
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <Label>Audience</Label>
            <Input disabled value={endTime ? endTime : ''} className="mt-3" />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Duration value</Label>
            <Input
              disabled
              value={durationValue ? durationValue : ''}
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <Label>Duration Period</Label>
            <Input
              disabled
              value={durationPeriod ? durationPeriod : ''}
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Start date</Label>
            <Input
              disabled
              value={startDate ? format(startDate, 'PPP') : ''}
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <Label>End date</Label>
            <Input
              disabled
              value={endDate ? format(endDate, 'PPP') : ''}
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Objective</Label>
            <div
              className="markdown my-10"
              dangerouslySetInnerHTML={{
                __html: marked(objective ? objective : ''),
              }}
            />
          </div>
          <div className="w-full">
            <Label>Curriculum</Label>
            <div
              className="markdown my-10"
              dangerouslySetInnerHTML={{
                __html: marked(curriculum ? curriculum : ''),
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

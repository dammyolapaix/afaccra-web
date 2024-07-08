import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseType } from '../course.types'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { marked } from 'marked'
import { LocaleType } from '@/types'
import { getCourseLocaleDays } from '../course.utils'

export default function CourseDetails({
  course: {
    titleEn,
    titleFr,
    days,
    audience,
    deliveryMode,
    language,
    objectiveEn,
    objectiveFr,
    curriculumEn,
    curriculumFr,
  },
  locale,
}: {
  course: CourseType
  locale: LocaleType
}) {
  const {
    utils: locale_utils,
    pages: {
      dashboard: { courses: locale_course },
    },
  } = locale
  return (
    <Card>
      <CardHeader>
        <CardTitle>{locale_course.course_details}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>{locale_course.title_en}</Label>
            <Input disabled value={titleEn ? titleEn : ''} className="mt-3" />
          </div>
          <div className="w-full">
            <Label>{locale_course.title_fr}</Label>
            <Input disabled value={titleFr ? titleFr : ''} className="mt-3" />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>{locale_course.language}</Label>
            <Input
              disabled
              value={
                language
                  ? language === 'english'
                    ? locale_utils.english
                    : locale_utils.french
                  : '-'
              }
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <Label>{locale_course.delivery_mode}</Label>
            <Input
              disabled
              value={deliveryMode ? deliveryMode : ''}
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>{locale_course.days}</Label>
            <div className="mt-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
              {days
                ? getCourseLocaleDays({ days, locale }).map((day) => (
                    <span key={day} className="mr-2">
                      {day}
                    </span>
                  ))
                : ''}
            </div>
          </div>
          <div className="w-full">
            <Label>{locale_course.audience}</Label>
            <Input
              disabled
              value={
                audience
                  ? audience === 'adults'
                    ? locale_utils.adults
                    : locale_utils.kids
                  : '-'
              }
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>{locale_course.objective_en}</Label>
            <div
              className="markdown my-10"
              dangerouslySetInnerHTML={{
                __html: marked(objectiveEn ? objectiveEn : ''),
              }}
            />
          </div>
          <div className="w-full">
            <Label>{locale_course.objective_fr}</Label>
            <div
              className="markdown my-10"
              dangerouslySetInnerHTML={{
                __html: marked(objectiveFr ? objectiveFr : ''),
              }}
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>{locale_course.curriculum_en}</Label>
            <div
              className="markdown my-10"
              dangerouslySetInnerHTML={{
                __html: marked(curriculumEn ? curriculumEn : ''),
              }}
            />
          </div>
          <div className="w-full">
            <Label>{locale_course.curriculum_fr}</Label>
            <div
              className="markdown my-10"
              dangerouslySetInnerHTML={{
                __html: marked(curriculumFr ? curriculumFr : ''),
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

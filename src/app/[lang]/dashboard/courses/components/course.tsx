import React from 'react'
import { CourseType } from '../course.types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CourseDetails from './course-details'
import CoursePricesTable from '../price/components/course.prices-table'
import CourseSchedulesTable from '../schedules/components/course.schedules-table'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import { EDIT_COURSE_ROUTE } from '../course.routes'
import { CoursePublishModal } from './course-publish-modal'
import { LocaleType } from '@/types'

export default function Course({
  course,
  lang,
  locale,
}: {
  course: CourseType
  locale: LocaleType
  lang: 'en' | 'fr'
}) {
  const {
    pages: {
      dashboard: { courses: locale_course },
    },
  } = locale

  return (
    <section>
      <div className="mb-5 flex justify-between items-center">
        <div className="font-bold text-2xl">
          {lang === 'fr' && course.titleFr ? course.titleFr : course.titleEn}
        </div>
        <div className="flex justify-between items-center gap-5">
          <CoursePublishModal course={course} locale={locale} />

          <Button className="gap-1 text-sm" asChild>
            <Link href={EDIT_COURSE_ROUTE(course.id)}>
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">
                {locale_course.actions.edit_course}
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="course">
        <TabsList>
          <TabsTrigger value="course">
            {locale_course.course_details}
          </TabsTrigger>
          <TabsTrigger value="price">{locale_course.course_price}</TabsTrigger>
          <TabsTrigger value="schedule">
            {locale_course.course_schedule}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="course">
          <CourseDetails course={course} locale={locale} lang={lang} />
        </TabsContent>
        <TabsContent value="price">
          <CoursePricesTable prices={course.prices} />
        </TabsContent>
        {/* <TabsContent value="schedule">
          <CourseSchedulesTable schedules={course.schedules} />
        </TabsContent> */}
      </Tabs>
    </section>
  )
}

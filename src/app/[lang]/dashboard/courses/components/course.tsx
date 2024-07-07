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

export default function Course({ course }: { course: CourseType }) {
  return (
    <section>
      <div className="mb-5 flex justify-between items-center">
        <div className="font-bold text-2xl">
          {course.titleEn ? course.titleEn : course.titleFr}
        </div>
        <div className="flex justify-between items-center gap-5">
          <CoursePublishModal course={course} />

          <Button className="gap-1 text-sm" asChild>
            <Link href={EDIT_COURSE_ROUTE(course.id)}>
              <Pencil className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Edit Course</span>
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="course">
        <TabsList>
          <TabsTrigger value="course">Course Details</TabsTrigger>
          <TabsTrigger value="price">Course Price</TabsTrigger>
          <TabsTrigger value="schedule">Course Schedule</TabsTrigger>
          <TabsTrigger value="purchases">Course Purchases</TabsTrigger>
        </TabsList>
        <TabsContent value="course">
          <CourseDetails course={course} />
        </TabsContent>
        <TabsContent value="price">
          <CoursePricesTable prices={course.prices} />
        </TabsContent>
        {/* <TabsContent value="schedule">
          <CourseSchedulesTable schedules={course.schedules} />
        </TabsContent> */}
        <TabsContent value="purchases">
          <></>
        </TabsContent>
      </Tabs>
    </section>
  )
}

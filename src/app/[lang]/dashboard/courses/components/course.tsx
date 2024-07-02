import React from 'react'
import { CourseType } from '../course.types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CourseDetails from './course-details'
import CoursePricesTable from '../price/components/course.prices-table'

export default function Course({ course }: { course: CourseType }) {
  return (
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
      <TabsContent value="schedule">
        <></>
      </TabsContent>
      <TabsContent value="purchases">
        <></>
      </TabsContent>
    </Tabs>
  )
}

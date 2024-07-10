import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CourseClassType } from '../classes.types'
import ClassDetails from './class-details'

export default function Class({ classInfo }: { classInfo: CourseClassType }) {
  return (
    <Tabs defaultValue="class">
      <TabsList>
        <TabsTrigger value="class">Class Details</TabsTrigger>
      </TabsList>
      <TabsContent value="class">
        <ClassDetails classInfo={classInfo} />
      </TabsContent>
    </Tabs>
  )
}

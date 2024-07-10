'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CourseClassType } from '../classes.types'
import ClassDetails from './class-details'
import { useState } from 'react'
import { useSearchParamsQuery } from '@/hooks'
import { CoursePriceType } from '../../courses/price/course.price.types'

type TabType = 'class' | 'price' | 'schedule' | string

export default function Class({
  classInfo,
  prices,
}: {
  classInfo: CourseClassType
  prices?: CoursePriceType[]
}) {
  const [tab, setTab] = useState<TabType>('class')

  useSearchParamsQuery({ query: 'tab', value: tab })

  const onTabChange = (value: string) => setTab(value)

  return (
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="class">Class Details</TabsTrigger>
        <TabsTrigger value="price">Price Details</TabsTrigger>
      </TabsList>

      <TabsContent value="class">
        {prices ? (
          <ClassDetails classInfo={classInfo} prices={prices} />
        ) : (
          <>Loading...</>
        )}
      </TabsContent>
      <TabsContent value="price">
        {/* <ClassDetails classInfo={classInfo} /> */}
      </TabsContent>
    </Tabs>
  )
}

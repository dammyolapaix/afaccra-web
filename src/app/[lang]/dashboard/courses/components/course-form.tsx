'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  courseAudienceEnum,
  courseDaysEnum,
  courseDeliveryModeEnum,
  courseDurationPeriodEnum,
  courseLanguageEnum,
  courseSchema,
} from '../course.schema'
import { CourseFormType, CourseResType, CourseType } from '../course.types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { addCourseAction, updateCourseAction } from '../course.actions'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { ALL_COURSES_ROUTE } from '../course.routes'
import Editor from '@/components/editor'
import { ErrorResType } from '@/types'

export default function CourseForm({ course }: { course?: CourseType }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<CourseFormType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      titleEn: course?.titleEn ? course.titleEn : undefined,
      titleFr: course?.titleFr ? course.titleFr : undefined,
      audience: course?.audience ? course.audience : undefined,
      language: course?.language ? course.language : undefined,
      deliveryMode: course?.deliveryMode ? course.deliveryMode : undefined,
      durationPeriod: course?.durationPeriod
        ? course.durationPeriod
        : undefined,
      durationValue: course?.durationValue ? course.durationValue : undefined,
      startDate: course?.startDate ? course.startDate : undefined,
      endDate: course?.endDate ? course.endDate : undefined,
      startTime: course?.startTime ? course.startTime : undefined,
      endTime: course?.endTime ? course.endTime : undefined,
      objective: course?.objective ? course.objective : undefined,
      curriculum: course?.curriculum ? course.curriculum : undefined,
      days: course?.days ? course.days : [],
    },
  })

  async function onSubmit(values: CourseFormType) {
    try {
      setIsLoading(true)
      let res: CourseResType | ErrorResType | null = null

      if (!course) res = await addCourseAction(values)

      if (course)
        res = await updateCourseAction({ id: course.id, course: values })

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success) {
        toast.success(
          course ? 'Course updated successfully' : 'Course created successfully'
        )
        router.push(ALL_COURSES_ROUTE)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Course</CardTitle>

        <CardDescription>
          Enter the course information to add a new course
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="titleEn"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title (English)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Title (English)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="titleFr"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title (French)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Title (French)" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseLanguageEnum.map((language) => (
                          <SelectItem value={language} key={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Mode</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Delivery Mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseDeliveryModeEnum.map((mode) => (
                          <SelectItem value={mode} key={mode}>
                            {mode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="days"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Days</FormLabel>
                    </div>
                    {courseDaysEnum.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="days"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Audience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseAudienceEnum.map((audience) => (
                          <SelectItem value={audience} key={audience}>
                            {audience}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="durationValue"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Duration value</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Enter Duration value"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="durationPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration Period</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseDurationPeriodEnum.map((period) => (
                          <SelectItem value={period} key={period}>
                            {period}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-1">
              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objective</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 grid-cols-1 md:grid-cols-1">
              <FormField
                control={form.control}
                name="curriculum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curriculum</FormLabel>
                    <FormControl>
                      <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isLoading ? true : undefined} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Course...
                </>
              ) : (
                'Add Course'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

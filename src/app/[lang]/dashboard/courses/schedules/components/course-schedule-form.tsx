'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader2, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ErrorResType } from '@/types'
import {
  CourseScheduleFormType,
  CourseScheduleResType,
  CourseScheduleType,
} from '../course.schedule.types'
import { courseScheduleSchema } from '../course.schedule.schema'
import {
  addCourseScheduleAction,
  updateCourseScheduleAction,
} from '../course.schedule.actions'
import { useParams } from 'next/navigation'

export default function CourseScheduleForm({
  schedule,
}: {
  schedule?: CourseScheduleType
}) {
  const params = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const form = useForm<CourseScheduleFormType>({
    resolver: zodResolver(courseScheduleSchema),
    defaultValues: {
      startTime: schedule?.startTime ? schedule.startTime : undefined,
      endTime: schedule?.endTime ? schedule.endTime : undefined,
      courseId: params.id ? (params.id as string) : undefined,
    },
  })

  async function onSubmit(values: CourseScheduleFormType) {
    try {
      setIsLoading(true)
      let res: CourseScheduleResType | ErrorResType | null = null

      if (!schedule) res = await addCourseScheduleAction(values)

      if (schedule)
        res = await updateCourseScheduleAction({
          id: schedule.id,
          schedule: values,
        })

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success) {
        toast.success(
          values
            ? 'Schedule updated successfully'
            : 'Schedule created successfully'
        )
        setDialogIsOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {}, [params.id])

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1 text-sm mt-5">
          {schedule ? (
            <Pencil className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {!schedule && (
            <span className="sr-only sm:not-sr-only">Add Schedule</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{schedule ? 'Edit' : 'Add'} Schedule</DialogTitle>
          <DialogDescription>
            Enter the information about the schedule in the form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-5 grid-cols-1">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Starting time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" placeholder="Enter Time" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-5 grid-cols-1">
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ending time</FormLabel>
                    <FormControl>
                      <Input {...field} type="time" placeholder="Enter Time" />
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
                  {schedule ? 'Updating' : 'Adding'}
                  Schedule...
                </>
              ) : (
                <>{schedule ? 'Update' : 'Add'} Schedule</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

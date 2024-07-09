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
import { CalendarIcon, Loader2, Pencil, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ErrorResType } from '@/types'
import {
  CourseCohortFormType,
  CourseCohortResType,
  CourseCohortType,
} from '../course.cohort.types'
import { courseCohortSchema } from '../course.cohort.schema'
import {
  addCourseCohortAction,
  updateCourseCohortAction,
} from '../course.cohort.actions'
import { useParams } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

export default function CourseCohortForm({
  cohort,
}: {
  cohort?: CourseCohortType
}) {
  const params = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const form = useForm<CourseCohortFormType>({
    resolver: zodResolver(courseCohortSchema),
    defaultValues: {
      startDate: cohort?.startDate ? cohort.startDate : undefined,
      endDate: cohort?.endDate ? cohort.endDate : undefined,
      courseId: params.id ? (params.id as string) : undefined,
    },
  })

  async function onSubmit(values: CourseCohortFormType) {
    try {
      setIsLoading(true)
      let res: CourseCohortResType | ErrorResType | null = null

      if (!cohort) res = await addCourseCohortAction(values)

      if (cohort)
        res = await updateCourseCohortAction({
          id: cohort.id,
          cohort: values,
        })

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success) {
        toast.success(
          values ? 'Cohort updated successfully' : 'Cohort created successfully'
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
          {cohort ? (
            <Pencil className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {!cohort && (
            <span className="sr-only sm:not-sr-only">Add Cohort</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cohort ? 'Edit' : 'Add'} Cohort</DialogTitle>
          <DialogDescription>
            Enter the information about the cohort in the form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-5 grid-cols-1">
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
            </div>
            <div className="grid gap-5 grid-cols-1">
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

            <Button disabled={isLoading ? true : undefined} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {cohort ? 'Updating' : 'Adding'}
                  Cohort...
                </>
              ) : (
                <>{cohort ? 'Update' : 'Add'} Cohort</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

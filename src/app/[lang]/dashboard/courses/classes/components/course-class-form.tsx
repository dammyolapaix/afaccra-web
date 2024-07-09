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
  CourseClassFormType,
  CourseClassResType,
  CourseClassType,
} from '../course.class.types'
import { courseClassSchema } from '../course.class.schema'
import {
  addCourseClassAction,
  updateCourseClassAction,
} from '../course.class.actions'
import { useParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CoursePriceType } from '../../price/course.price.types'
import { formatToMoney } from '@/lib/utils'
import { useSearchParamsQuery } from '@/hooks'
import { CourseType } from '../../course.types'

export default function CourseClassForm({
  classInfo,
  prices,
}: {
  classInfo?: CourseClassType
  prices: CoursePriceType[]
}) {
  const params = useParams()

  console.log(params)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const audienceParams = useSearchParamsQuery({
    query: 'audience',
    action: 'get',
  }) as CourseType['audience']

  const form = useForm<CourseClassFormType>({
    resolver: zodResolver(courseClassSchema),
    defaultValues: {
      name: classInfo?.name ? classInfo.name : undefined,
      displayOnWebsite: classInfo?.displayOnWebsite
        ? classInfo.displayOnWebsite
        : undefined,
      priceId: classInfo?.priceId ? classInfo.priceId : undefined,
    },
  })

  async function onSubmit(values: CourseClassFormType) {
    try {
      setIsLoading(true)
      let res: CourseClassResType | ErrorResType | null = null

      if (!classInfo)
        res = await addCourseClassAction(values, params.id as string)

      if (classInfo)
        res = await updateCourseClassAction({
          id: classInfo.id,
          classFormInput: values,
          courseId: params.id as string,
        })

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success) {
        toast.success(
          values ? 'Class updated successfully' : 'Class created successfully'
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
          {classInfo ? (
            <Pencil className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {!classInfo && (
            <span className="sr-only sm:not-sr-only">Add Class</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{classInfo ? 'Edit' : 'Add'} Class</DialogTitle>
          <DialogDescription>
            Enter the information about the class in the form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-5 grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`Enter class name`} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-5 grid-cols-1">
              <FormField
                control={form.control}
                name="priceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Price" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {prices.map(({ id, amount, level, child }) => (
                          <SelectItem value={id} key={id}>
                            {`${
                              audienceParams === 'adults' ? level!.name : child
                            } - ${formatToMoney(amount)}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-5 grid-cols-1">
              <FormField
                control={form.control}
                name="displayOnWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display on website</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={'true'}>Yes</SelectItem>
                        <SelectItem value={'false'}>No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="grid gap-5 grid-cols-1">
              
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
            </div> */}

            <Button disabled={isLoading ? true : undefined} type="submit">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {classInfo ? 'Updating' : 'Adding'}
                  Class...
                </>
              ) : (
                <>{classInfo ? 'Update' : 'Add'} Class</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

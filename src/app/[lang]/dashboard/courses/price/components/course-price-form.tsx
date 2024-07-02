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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  CoursePriceFormType,
  CoursePriceResType,
  CoursePriceType,
} from '../course.price.types'
import {
  courseChildPriceTypeEnum,
  courseLevelPriceTypeEnum,
  coursePriceSchema,
} from '../course.price.schema'
import {
  addCoursePriceAction,
  updateCoursePriceAction,
} from '../course.price.actions'
import { useParams } from 'next/navigation'

export default function CoursePriceForm({
  price,
}: {
  price?: CoursePriceType
}) {
  const params = useParams()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  const form = useForm<CoursePriceFormType>({
    resolver: zodResolver(coursePriceSchema),
    defaultValues: {
      amount: price?.amount ? price.amount / 100 : undefined,
      child: price?.child ? price.child : undefined,
      level: price?.level ? price.level : undefined,
      courseId: params.id ? (params.id as string) : undefined,
    },
  })

  async function onSubmit(values: CoursePriceFormType) {
    try {
      setIsLoading(true)
      let res: CoursePriceResType | ErrorResType | null = null

      if (!price) res = await addCoursePriceAction(values)

      if (price)
        res = await updateCoursePriceAction({ id: price.id, price: values })

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success) {
        toast.success(
          values ? 'Price updated successfully' : 'Price created successfully'
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
          {price ? (
            <Pencil className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
          {!price && <span className="sr-only sm:not-sr-only">Add Price</span>}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{price ? 'Edit' : 'Add'} Price</DialogTitle>
          <DialogDescription>
            Enter the information about the price in the form
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-5 grid-cols-1">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseLevelPriceTypeEnum.map((level) => (
                          <SelectItem value={level} key={level}>
                            {level}
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
                name="child"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Child</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Child" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {courseChildPriceTypeEnum.map((child) => (
                          <SelectItem value={child} key={child}>
                            {child}
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
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Amount" />
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
                  {price ? 'Updating' : 'Adding'}
                  Price...
                </>
              ) : (
                <>{price ? 'Update' : 'Add'} Price</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

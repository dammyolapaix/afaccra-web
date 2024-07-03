'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { CourseResType, CourseType } from '../course.types'
import { useState } from 'react'
import { updateCourseAction } from '../course.actions'
import { ErrorResType } from '@/types'
import { toast } from 'react-toastify'
import { Loader2, Rss } from 'lucide-react'

export function CoursePublishModal({ course }: { course: CourseType }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

  async function onSubmit() {
    try {
      setIsLoading(true)
      let res: CourseResType | ErrorResType | null = null

      if (course)
        res = await updateCourseAction({
          id: course.id,
          course: { isPublished: !course.isPublished },
        })

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success) {
        toast.success(
          course.isPublished
            ? 'Course unpublished successfully'
            : 'Course published successfully'
        )
        setDialogIsOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AlertDialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="gap-1 text-sm">
          <Rss className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">
            {course.isPublished ? 'Unpublish' : 'Publish'} Course
          </span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            disabled={isLoading ? true : undefined}
            type="submit"
            onClick={onSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {course.isPublished ? 'Unpublish' : 'Publish'}
                ... Course
              </>
            ) : (
              <>{course.isPublished ? 'Unpublish' : 'Publish'} Course</>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

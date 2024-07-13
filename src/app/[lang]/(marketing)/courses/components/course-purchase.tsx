'use client'

import { ErrorResType, UserType } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CoursePurchaseTransactionInitType } from '../course.types'
import { purchaseCourseAction } from '../course.actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import CustomAlertDialog from '@/components/custom/custom-alert-dialog'

export default function CoursePurchase({
  purchase,
  user,
}: {
  purchase: {
    classId: string
    cohortId: string
  }
  user: UserType | null
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const pathname = usePathname()

  async function onSubmit() {
    try {
      setIsLoading(true)
      let res: CoursePurchaseTransactionInitType | ErrorResType | null = null

      res = await purchaseCourseAction(purchase)

      if (res === null) return

      if (res) setIsLoading(false)

      if (!res.success)
        for (const error of res.errors) toast.error(error.message)

      if (res.success)
        window.open(res.transaction.data.authorization_url, '_self')
    } catch (error) {
      console.log(error)
    }
  }

  const handleRedirect = () => {
    localStorage.setItem('purchase', JSON.stringify(purchase))
    localStorage.setItem('redirect', pathname)
  }

  useEffect(() => {
    if (
      user &&
      localStorage.getItem('redirect') === null &&
      localStorage.getItem('purchase')
    ) {
      setIsLoading(true)
      localStorage.removeItem('purchase')
      onSubmit()
      setIsLoading(false)
    }
  }, [user, purchase])
  return (
    <>
      {user ? (
        <Button
          disabled={isLoading ? true : undefined}
          type="submit"
          onClick={onSubmit}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing payment...
            </>
          ) : (
            <>Purchase Course</>
          )}
        </Button>
      ) : (
        <CustomAlertDialog
          action="Login"
          actionHref="/login"
          cta="Purchase Course"
          title="You need to login first"
          description="In order to purchase a course, you need you to first login. If you don't have an account, you can sign up for an account. Don't worry, you will be redirected to the to complete the purchase of this course after you login or sign up."
          variant="default"
          actionOnClickHandler={handleRedirect}
        />
      )}
    </>
  )
}

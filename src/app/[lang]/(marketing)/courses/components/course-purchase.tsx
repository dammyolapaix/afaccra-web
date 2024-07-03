'use client'

import { ErrorResType } from '@/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { CoursePurchaseTransactionInitType } from '../course.types'
import { purchaseCourseAction } from '../course.actions'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export default function CoursePurchase({
  coursePriceId,
}: {
  coursePriceId: string
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit() {
    try {
      setIsLoading(true)
      let res: CoursePurchaseTransactionInitType | ErrorResType | null = null

      res = await purchaseCourseAction({ coursePriceId })

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
  useEffect(() => {}, [coursePriceId])
  return (
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
  )
}

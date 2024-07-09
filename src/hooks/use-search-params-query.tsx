'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function useSearchParamsQuery({
  query,
  value,
  action,
}: {
  query: string
  value?: string
  action?: 'get'
}) {
  const [getParams, setGetParams] = useState<string | undefined | null>(null)

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    if (action === 'get') {
      setGetParams(params.get(query))
    } else {
      if (value) {
        params.set(query, value)
      } else {
        params.delete(query)
      }
      replace(`${pathname}?${params.toString()}`)
    }
  }, [query, value, action])

  if (action === 'get') return getParams
  return
}

'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useSearchParamsQuery({
  query,
  value,
}: {
  query: string
  value?: string
}) {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)

  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    if (value) {
      params.set(query, value)
    } else {
      params.delete(query)
    }
    replace(`${pathname}?${params.toString()}`)
  }, [query, value])

  return
}

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

type NotFoundType = {
  message?: string
  description?: string
  cta?: string
  href?: string
  modal?: ReactNode
}

export default function NotFound({ info }: { info?: NotFoundType }) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-96">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          {info?.message ? info.message : 'Item not found'}
        </h3>

        {((info?.cta && info?.href && !info?.description) ||
          (info?.modal && !info?.description)) && (
          <p className="text-sm text-muted-foreground">
            You will see your items as soon you can add a new item
          </p>
        )}

        {((info?.cta && info?.href && info?.description) ||
          (info?.modal && info?.description)) && (
          <p className="text-sm text-muted-foreground">{info?.description}</p>
        )}

        {info?.cta && info?.href && (
          <Button size="default" className="gap-1 text-sm mt-5" asChild>
            <Link href={info?.href}>
              <Plus className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">{info?.cta}</span>
            </Link>
          </Button>
        )}

        {info?.modal && info.modal}
      </div>
    </div>
  )
}

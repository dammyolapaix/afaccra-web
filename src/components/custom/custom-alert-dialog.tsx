import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type CustomAlertDialogPropsType = {
  cta: string
  title: string
  description: string
  action: string
  actionHref: string
  actionOnClickHandler?: () => void
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined
}

export default function CustomAlertDialog({
  action,
  actionHref,
  actionOnClickHandler,
  cta,
  description,
  title,
  variant,
}: CustomAlertDialogPropsType) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant ? variant : 'outline'}>{cta}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {actionOnClickHandler ? (
            <AlertDialogAction asChild onClick={actionOnClickHandler}>
              <Button variant={variant ? variant : 'default'}>
                <Link href={actionHref}>{action}</Link>
              </Button>
            </AlertDialogAction>
          ) : (
            <AlertDialogAction asChild>
              <Button variant={variant ? variant : 'default'}>
                <Link href={actionHref}>{action}</Link>
              </Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

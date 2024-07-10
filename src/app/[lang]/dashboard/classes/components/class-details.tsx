import { CourseClassType } from '../classes.types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { formatToMoney } from '@/lib/utils'

export default function ClassDetails({
  classInfo: { name, displayOnWebsite, level, price },
}: {
  classInfo: CourseClassType
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Name</Label>
            <Input disabled value={name} className="mt-3" />
          </div>
          <div className="w-full">
            <Label>Level</Label>
            <Input
              disabled
              value={price.level ? price.level.name : level ? level.name : '-'}
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Child</Label>
            <Input
              disabled
              value={price.child ? 'Child' : '-'}
              className="mt-3"
            />
          </div>
          <div className="w-full">
            <Label>Price</Label>
            <Input
              disabled
              value={formatToMoney(price.amount)}
              className="mt-3"
            />
          </div>
        </div>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 mb-5">
          <div className="w-full">
            <Label>Display on website</Label>
            <Input
              disabled
              value={
                (displayOnWebsite as unknown as boolean) === true ? 'Yes' : 'No'
              }
              className="mt-3"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

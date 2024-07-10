import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CourseClassTableItem from './course.classes-table-item'
import NotFound from '@/components/not-found'
import CourseClassForm from './course-class-form'
import { useSearchParamsQuery } from '@/hooks'
import { CourseType } from '../../course.types'
import { CoursePriceType } from '../../price/course.price.types'
import { CourseClassType } from '../../../classes/classes.types'

export default function CourseClassesTable({
  classes,
  prices,
}: {
  classes: CourseClassType[]
  prices: CoursePriceType[]
}) {
  const audienceParams = useSearchParamsQuery({
    query: 'audience',
    action: 'get',
  }) as CourseType['audience']

  return (
    <>
      <div className="flex items-center mb-3">
        <div className="ml-auto flex items-center gap-2">
          <CourseClassForm prices={prices} audience={audienceParams} />
        </div>
      </div>
      {classes.length > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Course Classes</CardTitle>
            <CardDescription>The course classes list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {audienceParams === 'adults' && <TableHead>Level</TableHead>}
                  {audienceParams === 'kids' && <TableHead>Child</TableHead>}
                  <TableHead>Display on website</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classInfo) => (
                  <CourseClassTableItem
                    key={classInfo.id}
                    classInfo={classInfo}
                    prices={prices}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <NotFound
          info={{
            message: 'No class found',
            description: 'Add a new class for this course',
            modal: (
              <CourseClassForm prices={prices} audience={audienceParams} />
            ),
          }}
        />
      )}
    </>
  )
}

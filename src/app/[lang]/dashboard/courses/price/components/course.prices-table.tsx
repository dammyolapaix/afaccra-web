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
import CoursePricesTableItem from './course.prices-table-item'
import { CoursePriceType } from '../course.price.types'
import NotFound from '@/components/not-found'
import CoursePriceForm from './course-price-form'
import { LevelType } from '../../levels/level.types'

export default function CoursePricesTable({
  prices,
  levels,
}: {
  prices: CoursePriceType[]
  levels?: LevelType[]
}) {
  return (
    <>
      <div className="flex items-center mb-3">
        <div className="ml-auto flex items-center gap-2">
          {levels && <CoursePriceForm levels={levels} />}
        </div>
      </div>
      {prices.length > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Course Prices</CardTitle>
            <CardDescription>The course prices list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden sm:table-cell">Level</TableHead>
                  <TableHead className="hidden sm:table-cell">Child</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {levels &&
                  prices.map((price) => (
                    <CoursePricesTableItem
                      key={price.id}
                      price={price}
                      levels={levels}
                    />
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        levels && (
          <NotFound
            info={{
              message: 'No price found',
              description: 'Add a new price for this course',
              modal: <CoursePriceForm levels={levels} />,
            }}
          />
        )
      )}
    </>
  )
}

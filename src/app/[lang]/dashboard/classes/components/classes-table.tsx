import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { CourseClassType } from '../classes.types'
import NotFound from '@/components/not-found'
import ClassesTableItem from './classes-table-item'

export default function ClassesTable({
  count,
  classes,
}: {
  count: number
  classes: CourseClassType[]
}) {
  return (
    <>
      {count > 0 ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Classes ({count})</CardTitle>
            <CardDescription>Your classes list.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Level</TableHead>
                  <TableHead className="hidden sm:table-cell">Child</TableHead>
                  <TableHead className="hidden sm:table-cell">Price</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Display on website
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classInfo) => (
                  <ClassesTableItem key={classInfo.id} classInfo={classInfo} />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <NotFound info={{ message: 'No class found' }} />
      )}
    </>
  )
}

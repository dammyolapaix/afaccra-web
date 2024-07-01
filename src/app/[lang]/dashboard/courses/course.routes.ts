export const ALL_COURSES_ROUTE = '/dashboard/courses'
export const ADD_COURSE_ROUTE = '/dashboard/courses/add'
export const SINGLE_COURSE_ROUTE = (courseId: string) =>
  `/dashboard/courses/${courseId}`
export const EDIT_COURSE_ROUTE = (courseId: string) =>
  `/dashboard/courses/${courseId}/edit`

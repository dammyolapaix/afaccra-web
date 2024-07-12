import { headers } from 'next/headers'
import { NextRequest } from 'next/server'

export function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuth = request.cookies.has('token') && request.cookies.has('session')

  const refererURL = headers().get('referer')?.split(process.env.APP_URL!)[1]

  const authRoutes = ['login', 'register'] as const

  const hasAuthRoute = (path: string) =>
    authRoutes.filter((route) => route.includes(path)).length > 0

  const pathnameHasAuthRoute = () =>
    authRoutes.filter((route) => pathname.includes(route)).length > 0

  const redirectURL =
    headers().get('referer') !== null && refererURL && !hasAuthRoute(refererURL)
      ? refererURL
      : '/'

  // Redirect user to referrer route or home page if they are authenticated
  if (pathnameHasAuthRoute() && isAuth)
    return new URL(redirectURL!, request.url)

  // Redirect the user to the login if they are not authenticated
  if (pathname.includes('dashboard') && !isAuth)
    return new URL('/login', request.url)
}

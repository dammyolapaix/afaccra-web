import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from './app/[lang]/(marketing)/(auth)/middleware'
import { localesMiddleware } from './locales/middleware'

export function middleware(request: NextRequest) {
  const locales = localesMiddleware(request)

  if (authMiddleware(request))
    return NextResponse.redirect(authMiddleware(request)!)

  if (locales) return NextResponse.redirect(locales)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { cookies } from 'next/headers'

let locales = ['en', 'fr']
let defaultLocale = 'en'

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined
  let headers = { 'accept-language': acceptedLanguage }
  let languages = new Negotiator({ headers }).languages()

  /**
   * Language selection order
   *
   * 1. Check if the user has a preferred lang set in the cookie if not use #2
   * 2. The user browser language
   */
  const language = cookies().has('lang')
    ? cookies().get('lang')?.value
    : match(languages, locales, defaultLocale)

  return language
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect the user to the login if they are not authenticated
  if (pathname.includes('dashboard') && !request.cookies.has('token'))
    return NextResponse.redirect(new URL('/login', request.url))

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}

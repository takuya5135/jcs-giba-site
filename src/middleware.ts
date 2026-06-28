import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ja', 'en']
const defaultLocale = 'ja'

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language')
  if (!acceptLanguage) return defaultLocale

  if (acceptLanguage.includes('en')) {
    return 'en'
  }
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and static files with extensions (e.g., .png, .jpg, .ico)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}

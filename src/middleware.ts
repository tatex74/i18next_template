/**
 * Middleware for language routing
 *
 * This middleware automatically redirects users to the appropriate language
 * version based on their browser's language preferences or defaults to English.
 * It also ensures all routes have a language prefix.
 */

import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/settings';

/**
 * Detect user's preferred language from Accept-Language header
 * @param request - The incoming request
 * @returns The detected language code or default locale
 */
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',');
    for (const lang of languages) {
      const locale = lang.split('-')[0].trim();
      if (locales.includes(locale)) {
        return locale;
      }
    }
  }
  return defaultLocale;
}

/**
 * Middleware function that handles language routing
 * @param request - The incoming request
 * @returns Response or redirect to appropriate language route
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Redirect to the same URL with the locale prefix
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, favicon, static files)
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
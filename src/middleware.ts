import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/session/session';

import { i18n } from '@/i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  const locale = matchLocale(languages, locales, i18n.defaultLocale);
  return locale;
}

const protectedRoutes = [
  '/',
  '/id',
  '/en',
  '/dashboard',
  '/category',
  '/search',
  '/en/dashboard',
  '/en/category',
  '/en/search',
  '/en/saved',
  '/en/settings',
  '/en/settings/quiz-history',
  '/id/dashboard',
  '/id/category',
  '/id/search',
  '/id/saved',
  '/id/settings',
  '/id/settings/quiz-history',
];

const authRoutes = [
  '/',
  '/id',
  '/en',
  '/signup',
  '/login',
  '/en/signup',
  '/en/login',
  '/id/signup',
  '/id/login',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getSession(request);

  if (session && authRoutes.includes(pathname)) {
    const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Treat dynamic quiz routes as protected as well
  const isQuizPath = /^\/(en|id)\/quiz(\/|$)/.test(pathname);
  const requiresAuth = protectedRoutes.includes(pathname) || isQuizPath;

  if (!session && requiresAuth) {
    const absoluteURL = new URL('/login', request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

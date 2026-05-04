import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['id', 'en'];
const defaultLocale = 'id';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip internal paths, API routes, and static files (including favicon)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.includes('.')
  ) return;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}

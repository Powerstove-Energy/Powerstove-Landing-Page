import { NextResponse, type NextRequest } from 'next/server';
import { AUTH_COOKIE } from '@/lib/auth/auth-cookies';

const PROTECTED_PREFIXES = ['/agent/dashboard', '/agent/customers'];

/**
 * Fast cookie-presence redirect only — NOT the security boundary. The authoritative
 * check is requireAgent() in app/agent/(dashboard)/layout.tsx, which re-validates the
 * token against the backend on every request.
 *
 * Named `proxy` (not `middleware`) — this Next.js version renamed the convention;
 * confirmed against the reference admin-dashboard app on the same Next major.
 */
export function proxy(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((prefix) => request.nextUrl.pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  if (!request.cookies.has(AUTH_COOKIE.access)) {
    const loginUrl = new URL('/agent/login', request.url);
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/agent/dashboard/:path*', '/agent/customers/:path*'],
};

import { NextResponse, type NextRequest } from 'next/server';
import { exchangeRefreshToken } from '@/lib/api/server-api-client';
import { ACCESS_COOKIE_OPTIONS, AUTH_COOKIE } from '@/lib/auth/auth-cookies';

const PROTECTED_PREFIXES = ['/agent/dashboard', '/agent/customers', '/agent/stock'];

/**
 * Fast cookie-presence redirect only — NOT the security boundary. The authoritative
 * check is requireAgent() in app/agent/(dashboard)/layout.tsx, which re-validates the
 * token against the backend on every request.
 *
 * When the access cookie has expired but the refresh cookie is still present, a new
 * access token is minted here and set on both the forwarded request and the response,
 * so pages and Server Functions (POSTs to these same routes) keep working past the
 * 15-minute access lifetime.
 *
 * Named `proxy` (not `middleware`) — this Next.js version renamed the convention;
 * confirmed against the reference admin-dashboard app on the same Next major.
 */
export async function proxy(request: NextRequest) {
  const isProtected = PROTECTED_PREFIXES.some((prefix) => request.nextUrl.pathname.startsWith(prefix));

  if (!isProtected || request.cookies.has(AUTH_COOKIE.access)) {
    return NextResponse.next();
  }

  const refreshToken = request.cookies.get(AUTH_COOKIE.refresh)?.value;
  const accessToken = refreshToken ? await exchangeRefreshToken(refreshToken) : null;

  if (!accessToken) {
    const loginUrl = new URL('/agent/login', request.url);
    loginUrl.searchParams.set('returnTo', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  request.cookies.set(AUTH_COOKIE.access, accessToken);
  const response = NextResponse.next({ request: { headers: request.headers } });
  response.cookies.set(AUTH_COOKIE.access, accessToken, ACCESS_COOKIE_OPTIONS);
  return response;
}

export const config = {
  matcher: ['/agent/dashboard/:path*', '/agent/customers/:path*', '/agent/stock/:path*'],
};

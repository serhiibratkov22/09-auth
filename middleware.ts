import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSessionServer } from './lib/api/serverApi';

const protectedRoutes = ['/profile', '/notes', '/notes/action'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
  const pathname = req.nextUrl.pathname;

  if (accessToken) {
    if (publicRoutes.some(path => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  }
  if (!accessToken && refreshToken) {
    const ok = await checkSessionServer();

    if (ok) {
      if (publicRoutes.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.next();
    }
  }
  if (protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/notes/action/:path*',
    '/sign-in',
    '/sign-up',
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const isPublicPath = pathname === '/login' || pathname === '/signup' || pathname === '/verify';

  const token = request.cookies.get("token")?.value || '';

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // Proceed as usual if none of the conditions match
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/verify',
  ],
};

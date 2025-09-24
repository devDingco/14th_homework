// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(pathname)

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/triptalk', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};

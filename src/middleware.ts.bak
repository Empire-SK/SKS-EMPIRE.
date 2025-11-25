import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes
  const isProtected = path.startsWith('/admin') && path !== '/admin/login';

  // if (isProtected) {
  //   const token = request.cookies.get('auth_token')?.value;

  //   if (!token) {
  //     return NextResponse.redirect(new URL('/admin/login', request.url));
  //   }
  //   // In a real app, you might want to verify the token here as well,
  //   // but for middleware performance, we often just check existence
  //   // and let the API/Page verify validity.
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

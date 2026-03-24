import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const hasSbCookie = request.cookies.getAll().some((cookie) => cookie.name.includes('sb-'));
    if (!hasSbCookie) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = { matcher: ['/dashboard/:path*'] };

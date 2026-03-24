import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { hasAccess } from '@/lib/supabase/queries';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';
  if (code) {
    const supabase = createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    if (data.session?.user?.id) {
      const access = await hasAccess(data.session.user.id);
      const response = NextResponse.redirect(new URL(next, request.url));
      response.cookies.set('has_access', access ? '1' : '0', { httpOnly: true, path: '/' });
      return response;
    }
  }
  return NextResponse.redirect(new URL('/', request.url));
}

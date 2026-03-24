import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyDodoSignature } from '@/lib/dodo';

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('x-dodo-signature');

  if (!verifyDodoSignature(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const body = JSON.parse(payload);
  if (body.type !== 'payment.succeeded') return NextResponse.json({ ok: true });

  const userId = body.data?.metadata?.user_id;
  if (!userId) return NextResponse.json({ error: 'Missing user_id metadata' }, { status: 400 });

  const supabase = createAdminClient();
  const { error } = await supabase.from('purchases').upsert({
    user_id: userId,
    email: body.data?.customer?.email,
    dodo_order_id: body.data?.id,
    amount: body.data?.amount,
    currency: body.data?.currency,
    status: 'active'
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

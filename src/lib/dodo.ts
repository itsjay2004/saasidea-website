import crypto from 'node:crypto';

export function getCheckoutUrl({ userId, email }: { userId: string; email: string }) {
  const productId = process.env.NEXT_PUBLIC_DODO_PRODUCT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  return `https://checkout.dodopayments.com/buy/${productId}?quantity=1&email=${encodeURIComponent(email)}&metadata[user_id]=${encodeURIComponent(userId)}&redirect_url=${encodeURIComponent(`${appUrl}/dashboard?payment=success`)}`;
}

export function verifyDodoSignature(payload: string, signature: string | null) {
  if (!signature) return false;
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
  if (!secret) return false;
  const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

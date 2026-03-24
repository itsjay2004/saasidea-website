import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Pricing() {
  const items = ['1,200+ pain-driven SaaS ideas','15 industries, 75 niches','MRR potential + build time on every idea','Competition level + difficulty rating','Keyword data where available','New ideas added regularly','Lifetime access — no subscription','30-day money back guarantee'];
  return <section id="pricing" className="mx-auto max-w-3xl px-6 py-16 text-center"><p className="text-sm text-accent">Simple Pricing</p><h2 className="mt-2 text-3xl font-bold">One Price. Everything Included. Forever.</h2><div className="mt-6 rounded-2xl border border-accent/50 bg-surface p-8 shadow-[0_0_80px_-40px_#6C47FF]"><p className="text-text-muted"><span className="line-through">$99</span> <span className="text-5xl font-bold text-white">$49</span></p><p className="text-sm text-text-muted">one-time payment</p><Button className="mt-5">Get Instant Access →</Button><ul className="mt-6 space-y-2 text-left">{items.map((item)=><li key={item} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 text-success" />{item}</li>)}</ul></div><p className="mt-3 text-sm text-text-muted">🔒 Secure payment via Dodo Payments</p></section>;
}

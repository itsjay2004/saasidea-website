'use client';
import { useState } from 'react';

const faqs = [
['What exactly is in the idea library?','1,200+ SaaS ideas each with a title, tagline, the specific pain point it solves, target audience, estimated MRR range, build time, difficulty level, competition level, pricing model suggestion, and keyword data where available. Ideas span 15 industries and 75 niches.'],
['How is this different from free idea lists online?','Free lists give you generic ideas with no data. Every idea here includes MRR potential, build time estimates, competition level, and is built around a specific real pain point — not a vague concept. Plus keyword search data for planning your SEO.'],
['Do I need to be a developer to use this?','No. The ideas are useful for anyone evaluating what to build — developers, no-coders, or founders looking to hire. Difficulty ratings and build time estimates help you gauge what\'s realistic.'],
['Is this really a one-time payment?','Yes. Pay once, access everything forever including all new ideas added in the future. No monthly fees, no subscription.'],
['What if it\'s not right for me?','30-day money back guarantee, no questions asked. Email us and you\'ll get a full refund.'],
['How often are new ideas added?','New batches of ideas are added regularly. All future additions are included in your one-time purchase.']
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="mx-auto max-w-4xl px-6 py-16"><h2 className="text-3xl font-bold">FAQ</h2><div className="mt-6 space-y-3">{faqs.map((faq,idx)=><article key={faq[0]} className="rounded-xl border border-border bg-surface"><button className="w-full px-4 py-3 text-left font-medium" onClick={()=>setOpen(open===idx?null:idx)}>{faq[0]}</button>{open===idx && <p className="px-4 pb-4 text-sm text-text-muted">{faq[1]}</p>}</article>)}</div></section>;
}

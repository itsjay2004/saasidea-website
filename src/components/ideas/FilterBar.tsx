'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SearchBar } from './SearchBar';

const groups = {
  industry: ['Fintech','HR & Recruiting','Health & Wellness','Education','E-commerce','B2B SaaS','Legal','Real Estate','Creator Economy','Agency','Food & Bev','Travel','Developer Tools','Marketing','Productivity'],
  difficulty: ['Easy','Medium','Hard'],
  competition: ['low','medium','high'],
  mrr_range: ['under-2k','2k-8k','8k-20k','20k+'],
  pricing_model: ['Subscription','One-time','Usage-based']
} as const;

export function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();
  const setParam = (k: string, v: string) => { const p = new URLSearchParams(params); if (v === 'all') p.delete(k); else p.set(k, v); p.set('page','1'); router.push(`/ideas?${p.toString()}`); };

  return <aside className="top-24 h-fit space-y-4 rounded-xl border border-border bg-surface p-4 md:sticky"><SearchBar />{Object.entries(groups).map(([key,opts])=><div key={key}><p className="mb-1 text-xs uppercase tracking-wider text-text-subtle">{key.replace('_',' ')}</p><div className="space-y-1 text-sm"><button className="block text-left text-text-muted" onClick={()=>setParam(key,'all')}>All</button>{opts.map((o)=><button key={o} className="block text-left text-text-muted hover:text-white" onClick={()=>setParam(key,o)}>{o}</button>)}</div></div>)}<button className="text-sm text-accent" onClick={()=>router.push('/ideas')}>Clear all filters</button></aside>;
}

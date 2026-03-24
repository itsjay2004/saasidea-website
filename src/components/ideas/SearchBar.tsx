'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  return <input defaultValue={params.get('search') ?? ''} onChange={(e)=>{const p=new URLSearchParams(params); if(e.target.value) p.set('search', e.target.value); else p.delete('search'); p.set('page','1'); router.push(`/ideas?${p.toString()}`);}} placeholder="Search ideas..." className="w-full rounded-lg border border-border-light bg-surface px-3 py-2 text-sm"/>;
}

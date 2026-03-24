import Link from 'next/link';
import { Lock } from 'lucide-react';
import { KeywordTable } from '@/components/ideas/KeywordTable';
import { TrendChart } from '@/components/ideas/TrendChart';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/server';
import { getIdeaById, hasAccess } from '@/lib/supabase/queries';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const idea = await getIdeaById(params.id);
  return { title: `${idea.title} — SaaS Idea | SaaSIdea Pro`, description: idea.tagline };
}

export default async function IdeaDetailPage({ params }: { params: { id: string } }) {
  const [idea, supabase] = await Promise.all([getIdeaById(params.id), Promise.resolve(createClient())]);
  const { data } = await supabase.auth.getUser();
  const access = data.user ? await hasAccess(data.user.id) : false;
  const locked = !idea.is_free && !access;

  const totalSearch = idea.related_keywords?.reduce((sum, k) => sum + (k.search_volume ?? 0), 0) ?? 0;

  return <main className="mx-auto max-w-3xl"><Link href="/ideas" className="text-sm text-accent">← All Ideas</Link><p className="mt-3 text-sm text-text-muted">{idea.industry} / {idea.niche}</p><h1 className="mt-2 text-4xl font-bold">{idea.title}</h1><p className="mt-2 text-lg text-text-muted">{idea.tagline}</p><section className="mt-8 rounded-xl border border-accent/40 bg-accent/10 p-4"><p className="text-sm text-accent">The Problem</p><p className="mt-2">{idea.pain_point}</p></section><section className="mt-8 grid grid-cols-2 gap-3">{[['MRR Potential', `$${idea.mrr_potential.min} – $${idea.mrr_potential.max}/mo`],['Build Time', `${idea.build_time_weeks.min}–${idea.build_time_weeks.max} weeks`],['Suggested Price', `$${idea.suggested_price.amount}/${idea.suggested_price.interval}`],['Complexity', `${idea.complexity}/5`],['Target Audience', idea.target_audience],['Pricing Model', idea.pricing_model]].map((m)=><div key={m[0]} className="rounded-lg border border-border bg-surface p-3"><p className="text-xs text-text-subtle">{m[0]}</p><p>{m[1]}</p></div>)}</section><section className="mt-8"><p className="text-sm text-accent">Why this idea has demand</p><blockquote className="mt-2 rounded-xl border-l-4 border-accent bg-surface p-4 text-text-muted">{idea.validation_note}</blockquote></section><section className="mt-8 space-y-4"><h2 className="text-2xl font-semibold">Keyword Opportunities</h2><div className="grid grid-cols-3 gap-3 text-sm"><div className="rounded-lg border border-border p-3">Total search pool: {totalSearch.toLocaleString()}</div><div className="rounded-lg border border-border p-3">CPC range based on keyword rows</div><div className="rounded-lg border border-border p-3">Best entry point: {idea.primary_keyword?.keyword ?? 'n/a'}</div></div><KeywordTable keywords={idea.related_keywords ?? []} /><TrendChart monthlySearches={idea.primary_keyword?.monthly_searches ?? null} trend={idea.primary_keyword?.search_trend ?? null} /></section>
  {locked && <div className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur"><div className="rounded-xl border border-border bg-surface p-8 text-center"><Lock className="mx-auto h-8 w-8"/><p className="mt-3">Unlock this premium idea</p><Button href="/#pricing" className="mt-4">Upgrade Now</Button></div></div>}
  </main>;
}

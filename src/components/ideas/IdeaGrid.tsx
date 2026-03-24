import { IdeaCard } from '@/components/ideas/IdeaCard';
import { getIdeas } from '@/lib/supabase/queries';
import type { Filters } from '@/types';

export async function IdeaGrid({ filters, hasAccess }: { filters: Filters; hasAccess: boolean }) {
  const { ideas, total, hasMore } = await getIdeas(filters);
  const page = filters.page || 1;
  return (
    <div>
      <div className="mb-4 flex items-center justify-between"><p className="text-sm text-text-muted">{total} results</p><select className="rounded-md border border-border bg-surface px-2 py-1 text-sm"><option>Newest</option><option>MRR High-Low</option><option>Build Time</option><option>Easiest First</option></select></div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} hasAccess={hasAccess} />)}</div>
      <div className="mt-6 flex items-center justify-center gap-3 text-sm"><a href={`?page=${Math.max(1,page-1)}`} className="rounded border border-border px-3 py-1">Previous</a><span>Page {page}</span><a href={`?page=${hasMore ? page+1:page}`} className="rounded border border-border px-3 py-1">Next</a></div>
    </div>
  );
}

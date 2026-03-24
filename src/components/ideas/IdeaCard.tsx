import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { formatCompactNumber } from '@/lib/utils';
import type { Idea } from '@/types';
import { PaywallBlur } from './PaywallBlur';

export function IdeaCard({ idea, hasAccess }: { idea: Idea; hasAccess: boolean }) {
  const locked = !idea.is_free && !hasAccess;
  return (
    <article className="rounded-xl border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <Badge>{idea.industry}</Badge>
        <Badge className={idea.difficulty_label === 'Easy' ? 'bg-emerald-900/50 text-emerald-400' : idea.difficulty_label === 'Medium' ? 'bg-amber-900/50 text-amber-400' : 'bg-red-900/50 text-red-400'}>{idea.difficulty_label}</Badge>
      </div>
      <h3 className="text-base font-semibold">{idea.title}</h3>
      <p className="mt-1 line-clamp-2 text-xs text-text-muted">{idea.tagline}</p>
      <p className="mt-2 rounded-md bg-accent/10 px-2 py-1 text-xs italic text-accent-light">{idea.pain_point}</p>
      <PaywallBlur locked={locked}>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div><p className="text-text-subtle">MRR</p><p>${formatCompactNumber(idea.mrr_potential.min)}–${formatCompactNumber(idea.mrr_potential.max)}</p></div>
          <div><p className="text-text-subtle">Build</p><p>{idea.build_time_weeks.min}-{idea.build_time_weeks.max} wks</p></div>
          <div><p className="text-text-subtle">Price</p><p>${idea.suggested_price.amount}/{idea.suggested_price.interval}</p></div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-text-muted">{idea.primary_keyword?.keyword ?? 'No keyword'}</span>
          <Link href={locked ? '#pricing' : `/ideas/${idea.id}`} className="text-sm text-accent">View Idea →</Link>
        </div>
      </PaywallBlur>
    </article>
  );
}

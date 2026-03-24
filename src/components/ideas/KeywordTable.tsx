import type { Keyword } from '@/types';
import { formatCompactNumber } from '@/lib/utils';

export function KeywordTable({ keywords }: { keywords: Keyword[] }) {
  if (!keywords.length) return <p className="text-sm text-text-muted">Keyword data unavailable for this idea</p>;
  return <div className="overflow-auto rounded-xl border border-border"><table className="min-w-full text-sm"><thead className="bg-surface2 text-left"><tr><th className="px-3 py-2">Keyword</th><th>Monthly Searches</th><th>CPC</th><th>Bid Range</th><th>Competition</th></tr></thead><tbody>{keywords.map((k)=><tr key={k.id} className="border-t border-border"><td className="px-3 py-2">{k.keyword}</td><td>{formatCompactNumber(k.search_volume)}</td><td>${k.cpc ?? '—'}</td><td>${k.low_top_of_page_bid ?? '—'} - ${k.high_top_of_page_bid ?? '—'}</td><td>{k.competition ?? '—'}</td></tr>)}</tbody></table></div>;
}

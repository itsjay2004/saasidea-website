import { FilterBar } from '@/components/ideas/FilterBar';
import { IdeaGrid } from '@/components/ideas/IdeaGrid';
import { createClient } from '@/lib/supabase/server';
import { hasAccess } from '@/lib/supabase/queries';

export const metadata = { title: 'Browse SaaS Ideas Library — SaaSIdea Pro' };

export default async function IdeasPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const access = data.user ? await hasAccess(data.user.id) : false;
  const filters = {
    industry: searchParams.industry,
    difficulty: searchParams.difficulty,
    competition: searchParams.competition,
    pricing_model: searchParams.pricing_model,
    mrr_range: searchParams.mrr_range,
    search: searchParams.search,
    page: Number(searchParams.page ?? '1')
  };

  return <main className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[240px_1fr]"><FilterBar /><IdeaGrid filters={filters} hasAccess={access} /></main>;
}

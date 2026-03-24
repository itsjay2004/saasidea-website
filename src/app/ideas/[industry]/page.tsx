import { getIndustries, getIdeas } from '@/lib/supabase/queries';
import { IdeaCard } from '@/components/ideas/IdeaCard';

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((i) => ({ industry: i.industry }));
}

export async function generateMetadata({ params }: { params: { industry: string } }) {
  const { total } = await getIdeas({ page: 1, industry: params.industry });
  return {
    title: `${params.industry} SaaS Ideas — SaaSIdea Pro`,
    description: `Browse ${total} SaaS ideas in the ${params.industry} space.`
  };
}

export default async function IndustryPage({ params }: { params: { industry: string } }) {
  const { ideas, total } = await getIdeas({ page: 1, industry: params.industry });
  return <main className="mx-auto max-w-7xl p-6"><h1 className="text-3xl font-bold">{params.industry} ideas</h1><p className="text-text-muted">{total} results</p><div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{ideas.map((i)=><IdeaCard key={i.id} idea={i} hasAccess={true} />)}</div></main>;
}

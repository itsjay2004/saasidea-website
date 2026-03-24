import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getSavedIdeas } from '@/lib/supabase/queries';

export default async function DashboardPage({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const ideas = data.user ? await getSavedIdeas(data.user.id) : [];

  return <main className="mx-auto max-w-5xl"><h1 className="text-3xl font-bold">Dashboard</h1>{searchParams.payment === 'success' && <p className="mt-4 rounded-lg border border-success/50 bg-success/10 p-3">You're in! Browse all 1,200+ ideas →</p>}<h2 className="mt-6 text-xl">Saved ideas</h2><ul className="mt-3 space-y-2">{ideas.map((idea)=><li key={idea.id} className="rounded-lg border border-border p-3"><Link href={`/ideas/${idea.id}`}>{idea.title}</Link></li>)}{ideas.length===0 && <li className="text-text-muted">No saved ideas yet.</li>}</ul></main>;
}

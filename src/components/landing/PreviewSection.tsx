import type { Idea } from '@/types';
import { IdeaCard } from '@/components/ideas/IdeaCard';
import { Button } from '@/components/ui/Button';

export function PreviewSection({ ideas }: { ideas: Idea[] }) {
  return (
    <section id="preview" className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm text-accent">Preview</p><h2 className="mt-2 text-3xl font-bold">A Glimpse of What's Inside</h2>
      <p className="mt-2 text-text-muted">Browse a small sample of the 1,200+ ideas waiting for you</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{ideas.slice(0,6).map((idea,idx)=><IdeaCard key={idea.id} idea={idea} hasAccess={idx<2} />)}</div>
      <div className="mt-8 flex items-center justify-between rounded-xl border border-accent/40 bg-accent/10 p-4"><p>You're seeing 2 of 1,200+ ideas</p><Button href="#pricing">Unlock All Ideas — One-Time Payment →</Button></div>
    </section>
  );
}

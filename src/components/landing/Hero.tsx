import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-14">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1F293733_1px,transparent_1px),linear-gradient(to_bottom,#1F293733_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="mx-auto max-w-6xl text-center">
        <Badge className="mb-6 border-accent/40 bg-accent/10 text-accent-light">1,200+ Validated Ideas • Updated Monthly</Badge>
        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight">Stop Guessing.<br />Start Building Ideas<br />People Actually Want.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-text-muted">1,200+ pain-driven SaaS ideas across 15 industries and 75 niches. Each idea includes MRR potential, build time, competition level, and keyword data. One-time payment. Lifetime access.</p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button href="/ideas">Browse All Ideas →</Button>
          <Button href="#preview" variant="outline">See What's Inside ↓</Button>
        </div>
        <p className="mt-4 text-sm text-text-muted">⭐⭐⭐⭐⭐ Trusted by 2,000+ founders</p>
      </div>
    </section>
  );
}

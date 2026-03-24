export function HowItWorks() {
  const steps = [
    ['Browse by Industry or Niche', 'Filter 1,200+ ideas by industry, difficulty, MRR potential, and competition level to find your perfect match.'],
    ['Evaluate with Real Data', 'Every idea shows MRR potential, build time estimate, target audience, pain point, and keyword search data.'],
    ['Build with Confidence', 'Know your market before you write a single line of code. Validate demand, understand competition, start building.']
  ];
  return <section className="mx-auto max-w-6xl px-6 py-16"><p className="text-sm text-accent">Simple Process</p><h2 className="mt-2 text-3xl font-bold">From Idea to Launch-Ready in Minutes</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{steps.map((s,i)=><article key={s[0]} className="rounded-xl border border-border bg-surface p-5"><div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">{i+1}</div><h3 className="font-semibold">{s[0]}</h3><p className="mt-2 text-sm text-text-muted">{s[1]}</p></article>)}</div></section>;
}

import { FAQ } from '@/components/landing/FAQ';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { NicheGrid } from '@/components/landing/NicheGrid';
import { PreviewSection } from '@/components/landing/PreviewSection';
import { Pricing } from '@/components/landing/Pricing';
import { Stats } from '@/components/landing/Stats';
import { getIndustries, getPreviewIdeas } from '@/lib/supabase/queries';

export default async function MarketingPage() {
  const [ideas, industries] = await Promise.all([getPreviewIdeas(), getIndustries()]);
  return (
    <main>
      <Hero />
      <Stats />
      <HowItWorks />
      <section id="features" className="mx-auto max-w-6xl px-6 py-16"><p className="text-sm text-accent">What You Get</p><h2 className="mt-2 text-3xl font-bold">Everything You Need to Find Your Next SaaS</h2></section>
      <PreviewSection ideas={ideas} />
      <NicheGrid industries={industries} />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}

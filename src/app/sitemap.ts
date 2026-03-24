import type { MetadataRoute } from 'next';
import { getIdeas, getIndustries } from '@/lib/supabase/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ ideas }, industries] = await Promise.all([getIdeas({ page: 1 }), getIndustries()]);
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://saasidea.pro';
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/ideas`, lastModified: new Date() },
    ...ideas.map((idea) => ({ url: `${base}/ideas/${idea.id}`, lastModified: new Date(idea.created_at) })),
    ...industries.map((industry) => ({ url: `${base}/ideas/${encodeURIComponent(industry.industry)}`, lastModified: new Date() }))
  ];
}

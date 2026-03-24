import { cache } from 'react';
import { createClient } from '@/lib/supabase/server';
import type { Filters, Idea, Keyword } from '@/types';

const PAGE_SIZE = 24;

type IdeaRow = {
  id: string;
  title: string;
  tagline: string;
  pain_point: string;
  industry: string;
  niche: string;
  sub_niche: string;
  tags: string[];
  target_audience: string;
  mrr_min: number;
  mrr_max: number;
  mrr_currency: string;
  build_min: number;
  build_max: number;
  pricing_model: string;
  price_amount: number;
  price_interval: string;
  price_currency: string;
  complexity: number;
  difficulty_label: 'Easy' | 'Medium' | 'Hard';
  competition_level: 'low' | 'medium' | 'high';
  validation_note: string;
  is_free: boolean;
  keywords: string[];
  created_at: string;
  keyword_idea_mapping?: { is_primary: boolean; keywords: Keyword }[];
};

function mapIdea(row: IdeaRow): Idea {
  const primary = row.keyword_idea_mapping?.find((k) => k.is_primary)?.keywords ?? null;
  return {
    id: row.id,
    title: row.title,
    tagline: row.tagline,
    pain_point: row.pain_point,
    industry: row.industry,
    niche: row.niche,
    sub_niche: row.sub_niche,
    tags: row.tags ?? [],
    target_audience: row.target_audience,
    mrr_potential: { min: row.mrr_min, max: row.mrr_max, currency: row.mrr_currency },
    build_time_weeks: { min: row.build_min, max: row.build_max },
    pricing_model: row.pricing_model,
    suggested_price: { amount: row.price_amount, interval: row.price_interval, currency: row.price_currency },
    complexity: row.complexity,
    difficulty_label: row.difficulty_label,
    competition_level: row.competition_level,
    validation_note: row.validation_note,
    is_free: row.is_free,
    keywords: row.keywords ?? [],
    created_at: row.created_at,
    primary_keyword: primary
  };
}

export async function getIdeas(filters: Filters) {
  const supabase = createClient();
  const page = Math.max(filters.page || 1, 1);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE - 1;

  let query = supabase
    .from('ideas')
    .select(
      `
      id,title,tagline,pain_point,industry,niche,sub_niche,tags,target_audience,
      mrr_min:"mrr_potential.min",mrr_max:"mrr_potential.max",mrr_currency:"mrr_potential.currency",
      build_min:"build_time_weeks.min",build_max:"build_time_weeks.max",
      pricing_model,
      price_amount:"suggested_price.amount",price_interval:"suggested_price.interval",price_currency:"suggested_price.currency",
      complexity,difficulty_label,competition_level,validation_note,is_free,keywords,created_at,
      keyword_idea_mapping!left(is_primary,keywords!keyword_idea_mapping_keyword_id_fkey(*))
    `,
      { count: 'exact' }
    )
    .eq('keyword_idea_mapping.is_primary', true)
    .order('created_at', { ascending: false })
    .range(start, end);

  if (filters.industry) query = query.eq('industry', filters.industry);
  if (filters.difficulty) query = query.eq('difficulty_label', filters.difficulty);
  if (filters.competition) query = query.eq('competition_level', filters.competition.toLowerCase());
  if (filters.pricing_model) query = query.eq('pricing_model', filters.pricing_model);
  if (filters.search) query = query.or(`title.ilike.%${filters.search}%,tagline.ilike.%${filters.search}%,pain_point.ilike.%${filters.search}%`);

  if (filters.mrr_range === 'under-2k') query = query.lt('mrr_potential.max', 2000);
  if (filters.mrr_range === '2k-8k') query = query.gte('mrr_potential.min', 2000).lte('mrr_potential.max', 8000);
  if (filters.mrr_range === '8k-20k') query = query.gte('mrr_potential.min', 8000).lte('mrr_potential.max', 20000);
  if (filters.mrr_range === '20k+') query = query.gte('mrr_potential.max', 20000);

  const { data, count, error } = await query;
  if (error) throw error;

  const ideas = (data as IdeaRow[]).map(mapIdea);
  return { ideas, total: count ?? 0, hasMore: (count ?? 0) > page * PAGE_SIZE };
}

export const getIdeaById = cache(async (id: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ideas')
    .select(
      `
      id,title,tagline,pain_point,industry,niche,sub_niche,tags,target_audience,
      mrr_min:"mrr_potential.min",mrr_max:"mrr_potential.max",mrr_currency:"mrr_potential.currency",
      build_min:"build_time_weeks.min",build_max:"build_time_weeks.max",
      pricing_model,
      price_amount:"suggested_price.amount",price_interval:"suggested_price.interval",price_currency:"suggested_price.currency",
      complexity,difficulty_label,competition_level,validation_note,is_free,keywords,created_at,
      keyword_idea_mapping!left(id,is_primary,keywords!keyword_idea_mapping_keyword_id_fkey(*))
      `
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  const row = data as IdeaRow;
  const mapped = mapIdea(row);

  const keywordMappings = (row.keyword_idea_mapping ?? []) as { is_primary: boolean; keywords: Keyword }[];
  mapped.related_keywords = keywordMappings
    .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || (b.keywords.search_volume ?? 0) - (a.keywords.search_volume ?? 0))
    .map((k) => k.keywords);

  return mapped;
});

export const getIndustries = cache(async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from('ideas').select('industry');
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const row of data) counts.set(row.industry, (counts.get(row.industry) ?? 0) + 1);
  return Array.from(counts.entries()).map(([industry, count]) => ({ industry, count })).sort((a, b) => b.count - a.count);
});

export const getNiches = cache(async (industry: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('ideas').select('niche').eq('industry', industry);
  if (error) throw error;
  const counts = new Map<string, number>();
  for (const row of data) counts.set(row.niche, (counts.get(row.niche) ?? 0) + 1);
  return Array.from(counts.entries()).map(([niche, count]) => ({ niche, count })).sort((a, b) => b.count - a.count);
});

export const getSavedIdeas = cache(async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('saved_ideas')
    .select(
      `
      ideas(
        id,title,tagline,pain_point,industry,niche,sub_niche,tags,target_audience,
        mrr_min:"mrr_potential.min",mrr_max:"mrr_potential.max",mrr_currency:"mrr_potential.currency",
        build_min:"build_time_weeks.min",build_max:"build_time_weeks.max",
        pricing_model,
        price_amount:"suggested_price.amount",price_interval:"suggested_price.interval",price_currency:"suggested_price.currency",
        complexity,difficulty_label,competition_level,validation_note,is_free,keywords,created_at
      )
      `
    )
    .eq('user_id', userId);

  if (error) throw error;
  return (data ?? []).map((row) => mapIdea(row.ideas as IdeaRow));
});

export const hasAccess = cache(async (userId: string) => {
  const supabase = createClient();
  const { count, error } = await supabase.from('purchases').select('*', { count: 'exact', head: true }).eq('user_id', userId).eq('status', 'active');
  if (error) throw error;
  return (count ?? 0) > 0;
});

export const getPreviewIdeas = cache(async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('ideas')
    .select(`
      id,title,tagline,pain_point,industry,niche,sub_niche,tags,target_audience,
      mrr_min:"mrr_potential.min",mrr_max:"mrr_potential.max",mrr_currency:"mrr_potential.currency",
      build_min:"build_time_weeks.min",build_max:"build_time_weeks.max",
      pricing_model,
      price_amount:"suggested_price.amount",price_interval:"suggested_price.interval",price_currency:"suggested_price.currency",
      complexity,difficulty_label,competition_level,validation_note,is_free,keywords,created_at,
      keyword_idea_mapping!left(is_primary,keywords!keyword_idea_mapping_keyword_id_fkey(*))
    `)
    .eq('is_free', true)
    .eq('keyword_idea_mapping.is_primary', true)
    .limit(6);

  if (error) throw error;
  return (data as IdeaRow[]).map(mapIdea);
});

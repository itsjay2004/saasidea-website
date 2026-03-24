'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export function TrendChart({ monthlySearches, trend }: { monthlySearches: { year: number; month: number; search_volume: number }[] | null; trend: 'growing' | 'stable' | 'declining' | null }) {
  if (!monthlySearches?.length) return null;
  const data = monthlySearches.slice(-12).map((m) => ({ label: `${m.month}/${String(m.year).slice(2)}`, volume: m.search_volume }));
  const fill = trend === 'growing' ? '#10B981' : trend === 'declining' ? '#EF4444' : '#6C47FF';
  return <div className="h-64 rounded-xl border border-border p-4"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><XAxis dataKey="label" stroke="#9CA3AF" /><YAxis stroke="#9CA3AF" /><Bar dataKey="volume" fill={fill} radius={[6,6,0,0]} /></BarChart></ResponsiveContainer></div>;
}

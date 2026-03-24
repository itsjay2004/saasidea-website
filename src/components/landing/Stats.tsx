export function Stats() {
  const stats = [
    ['1,200+', 'Validated Ideas'],
    ['15', 'Industries'],
    ['75+', 'Niches'],
    ['$0', 'Monthly fee — pay once']
  ];
  return <section className="mx-auto grid max-w-6xl grid-cols-2 gap-4 border-y border-border px-6 py-8 md:grid-cols-4">{stats.map(([v, l]) => <div key={l} className="text-center md:border-r md:last:border-r-0 md:border-border"><p className="text-2xl font-bold">{v}</p><p className="text-sm text-text-muted">{l}</p></div>)}</section>;
}

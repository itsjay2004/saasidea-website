export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background px-6 py-8">{children}</div>;
}

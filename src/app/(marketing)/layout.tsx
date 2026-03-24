import { Navbar } from '@/components/ui/Navbar';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background text-white"><Navbar />{children}</div>;
}

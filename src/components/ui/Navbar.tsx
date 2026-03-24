import { Bolt } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-white">
          <Bolt className="h-5 w-5 text-accent" />
          <span className="text-lg font-bold">SaaSIdea Pro</span>
        </div>
        <nav className="hidden gap-6 text-sm text-text-muted md:flex">
          <a href="#features">Features</a><a href="/ideas">Browse Ideas</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a>
        </nav>
        <Button>Get Lifetime Access</Button>
      </div>
    </header>
  );
}

import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PaywallBlur({ locked, children }: { locked: boolean; children: React.ReactNode }) {
  if (!locked) return <>{children}</>;
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="pointer-events-none blur-sm">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-transparent via-background/70 to-background">
        <Lock className="h-6 w-6 text-white" />
        <p className="mt-2 text-sm">Unlock to view</p>
        <Button href="#pricing" className="mt-3">Unlock 1,200+ Ideas — $49 one-time</Button>
      </div>
    </div>
  );
}

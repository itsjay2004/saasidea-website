import { cn } from '@/lib/utils';

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('rounded-full border border-border-light px-2.5 py-1 text-xs text-text-muted', className)}>{children}</span>;
}

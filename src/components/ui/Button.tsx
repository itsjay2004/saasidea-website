import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & { href?: string; variant?: 'primary' | 'ghost' | 'outline' };

const base = 'inline-flex items-center justify-center rounded-[20px] px-5 py-2.5 text-sm font-semibold transition';
const variants = {
  primary: 'bg-accent text-white hover:opacity-90',
  ghost: 'text-white/80 hover:text-white',
  outline: 'border border-border-light text-white hover:bg-white/5'
};

export function Button({ href, className, variant = 'primary', ...props }: Props) {
  if (href) return <Link href={href} className={cn(base, variants[variant], className)}>{props.children}</Link>;
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

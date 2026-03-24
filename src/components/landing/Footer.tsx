import { Bolt } from 'lucide-react';

export function Footer() {
  return <footer className="border-t border-border px-6 py-10"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 md:flex-row"><div><p className="flex items-center gap-2 font-bold"><Bolt className="h-4 w-4 text-accent"/> SaaSIdea Pro</p><p className="text-sm text-text-muted">Find your next SaaS idea.</p></div><div className="flex gap-4 text-sm text-text-muted"><a href="/ideas">Browse Ideas</a><a href="#pricing">Pricing</a><a href="#faq">FAQ</a><a href="mailto:hello@saasidea.pro">Contact</a></div></div><p className="mx-auto mt-8 max-w-6xl text-xs text-text-subtle">© 2025 SaaSIdea Pro. All rights reserved.</p></footer>;
}

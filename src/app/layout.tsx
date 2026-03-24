import type { Metadata } from 'next';
import { Geist, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });

export const metadata: Metadata = {
  title: 'SaaSIdea Pro — 1,200+ Validated SaaS Ideas for Founders',
  description:
    'Browse 1,200+ pain-driven SaaS ideas across 15 industries. Each idea includes MRR potential, build time, competition data, and keyword research. One-time payment.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}

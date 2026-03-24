import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0F1E',
        surface: '#111827',
        surface2: '#1F2937',
        border: '#1F2937',
        'border-light': '#374151',
        text: '#F9FAFB',
        'text-muted': '#9CA3AF',
        'text-subtle': '#6B7280',
        accent: '#6C47FF',
        'accent-light': '#EDE8FF',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444'
      }
    }
  },
  plugins: []
};

export default config;

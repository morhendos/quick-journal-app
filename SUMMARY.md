import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-playfair)'],
        body: ['var(--font-lora)'],
      },
      colors: {
        background: 'hsl(var(--background))',
        paper: 'hsl(var(--paper))',
        foreground: 'hsl(var(--foreground))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        ink: 'hsl(var(--ink))',
      },
      scale: {
        '102': '1.02',
        '98': '0.98',
      },
    },
  },
  plugins: [],
};

export default config;
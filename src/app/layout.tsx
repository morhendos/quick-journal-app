import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { Playfair_Display, Lora } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

// Initialize fonts with subsets and weights
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Daily Journal - A Place for Reflection',
  description: 'Capture your daily moments of growth and joy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
      className={`${playfair.variable} ${lora.variable}`}
    >
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

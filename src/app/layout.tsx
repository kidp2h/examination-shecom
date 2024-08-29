import type { Metadata } from 'next';
import './globals.css';

import { Inter as FontSans } from 'next/font/google';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Examination Shecom',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

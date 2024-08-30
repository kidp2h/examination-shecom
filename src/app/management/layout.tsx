import '@/app/globals.css';
import type { Metadata } from 'next';

import { Calendar, CircleGauge, Home } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from '@/components/ModeToggle';
import { Inter as FontSans } from 'next/font/google';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10  w-14 flex-col bg-background flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>

            <Link
              href="/management/calendar"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Calendar className="h-5 w-5" />
              <span className="sr-only">Calendar</span>
            </Link>

            <Link
              href="/management/dashboard"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <CircleGauge className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <ModeToggle />
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-background px-4 sm:static sm:h-auto sm:bg-transparent sm:px-6"></header>
          {children}
        </div>
      </div>
    </>
  );
}

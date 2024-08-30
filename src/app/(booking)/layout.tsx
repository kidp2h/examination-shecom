import '@/app/globals.css';

import type { Metadata } from 'next';

import { Inter as FontSans } from 'next/font/google';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'Booking',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="w-[90%] m-auto">{children}</div>
    </>
  );
}

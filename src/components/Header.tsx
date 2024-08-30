'use client';
import { useTheme } from 'next-themes';

import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';

export const Header = (props: {}) => {
  const { setTheme } = useTheme();
  return (
    <div className="p-8 flex items-center justify-between ">
      <div className="flex items-center">
        <h3 className="text-5xl cursor-pointer font-semibold text-blue-500 tracking-tight mr-20">
          Booking
        </h3>
        <div className="[&>*]:mr-20 [&>*]:cursor-pointer flex items-center justify-center text-gray-500">
          <Link href={'/'}>Home</Link>
          <Link href={'/management/dashboard'}>Dashboard</Link>
        </div>
      </div>
      <div className="[&>Button]:ml-3 flex items-center">
        <ModeToggle />
      </div>
    </div>
  );
};

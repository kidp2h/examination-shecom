import { type ClassValue, clsx } from 'clsx';
import { NextResponse } from 'next/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function response<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      data,
      status,
    },
    {
      status,
    },
  );
}
export function throwError(
  message: string = 'Internal Server Error',
  status: number = 500,
) {
  return NextResponse.json(
    {
      message,
      data: null,
    },
    {
      status,
    },
  );
}

export function checkDateISORange(checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return false;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  return !(checkInDate > checkOutDate);
}

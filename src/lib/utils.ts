import { type ClassValue, clsx } from 'clsx';
import { NextResponse } from 'next/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function response(data: any, status = 200) {
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

import prisma from '@/lib/prisma';
import { response, throwError } from '@/lib/utils';
import { Booking } from '@prisma/client';
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany();

    return response(bookings);
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

export async function POST(booking: Booking) {
  try {
    const newBooking = await prisma.booking.create({
      data: booking,
    });
    return response(newBooking, 200);
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

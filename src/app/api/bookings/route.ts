import prisma from '@/lib/prisma';
import { checkDateISORange, response, throwError } from '@/lib/utils';
import { StatusBooking } from '@prisma/client';
import { NextRequest } from 'next/server';
export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      where: {},
      include: {
        room: true,
      },
    });

    return response(bookings);
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

export async function POST(request: NextRequest) {
  try {
    const booking = await request.json();
    if (
      !checkDateISORange(
        booking.information.checkIn,
        booking.information.checkOut,
      )
    ) {
      return throwError('Invalid date', 400);
    }

    // check if room is available for booking
    const room = await prisma.room.findUnique({
      where: {
        id: booking.room.id,
        bookings: {
          some: {
            check_in_date: {
              lte: new Date(booking.information.checkOut),
            },
            check_out_date: {
              gte: new Date(booking.information.checkIn),
            },
            deletedAt: null,
          },
        },
      },
    });

    if (room) {
      return throwError('Room is not available', 400);
    }

    const { information } = booking;

    const newBooking = await prisma.booking.create({
      data: {
        user_name: `${booking.information.lastName} ${booking.information.firstName} `,
        room: {
          connect: {
            id: booking.room.id,
          },
        },
        status: StatusBooking.BOOKED,
        check_in_date: new Date(information.checkIn),
        check_out_date: new Date(information.checkOut),
      },
    });
    return response(newBooking, 200);
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

import prisma from '@/lib/prisma';
import { response, throwError } from '@/lib/utils';
import { type NextRequest } from 'next/server';
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const checkIn = searchParams.get('check_in');
    const checkOut = searchParams.get('check_out');
    const location = searchParams.get('location');
    if (checkIn && checkOut && location) {
      const rooms = await prisma.room.findMany({
        where: {
          NOT: {
            bookings: {
              some: {
                OR: [
                  {
                    check_in_date: { gte: checkIn, lte: checkOut },
                  },
                  {
                    check_out_date: { gte: checkIn, lte: checkOut },
                  },
                ],
              },
            },
          },
          location: {
            contains: location,
          },
        },
      });
      return response(rooms);
    } else {
      return throwError('Invalid search parameters', 400);
    }
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

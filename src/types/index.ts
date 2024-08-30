import { Prisma } from '@prisma/client';

export type ResponseType<T> = {
  data: T;
  status: number;
};

export type Information = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
};
export type BookingWithRoom = Prisma.BookingGetPayload<{
  include: { room: true };
}>;
export type RoomWithBookings = Prisma.RoomGetPayload<{
  include: { bookings: true };
}>;

'use server';
import { api } from '@/services';
import {
  BookingWithRoom,
  Information,
  ResponseType,
  RoomWithBookings,
} from '@/types';
import { revalidatePath } from 'next/cache';

export const getBookings = async (): Promise<
  ResponseType<BookingWithRoom[]>
> => {
  return api(`/api/bookings`, 'GET');
};
export const cancelBooking = async (
  id: string,
): Promise<ResponseType<BookingWithRoom>> => {
  const result = api(`/api/bookings/${id}`, 'DELETE');

  revalidatePath('/management/dashboard');
  return result;
};
export const bookRoom = async (
  information: Information,
  room: Partial<RoomWithBookings>,
): Promise<ResponseType<BookingWithRoom>> => {
  const result = api('/api/bookings', 'POST', {
    room,
    information,
  });
  revalidatePath('/management/dashboard');
  return result;
};

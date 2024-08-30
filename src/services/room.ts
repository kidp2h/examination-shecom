import { api } from '@/services';
import { ResponseType, RoomWithBookings } from '@/types';
import { Room } from '@prisma/client';

export const getRooms = async (): Promise<ResponseType<RoomWithBookings[]>> => {
  return api('/api/rooms', 'GET');
};
export const getRoom = async (
  id: string,
): Promise<ResponseType<RoomWithBookings>> => {
  return api(`/api/rooms/${id}`, 'GET');
};
export const createRoom = async (
  room: any,
): Promise<ResponseType<RoomWithBookings>> => {
  return api('/api/rooms', 'POST', room);
};

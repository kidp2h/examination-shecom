import { api } from '@/services';
import { ResponseType, RoomWithBookings } from '@/types';

export const getRooms = async (): Promise<ResponseType<RoomWithBookings[]>> => {
  return api('/api/rooms', 'GET');
};
export const getRoom = async (
  id: string,
): Promise<ResponseType<RoomWithBookings>> => {
  return await api(`/api/rooms/${id}`, 'GET');
};
export const createRoom = async (
  room: any,
): Promise<ResponseType<RoomWithBookings>> => {
  return await api('/api/rooms', 'POST', room);
};

export const dynamic = 'force-dynamic';

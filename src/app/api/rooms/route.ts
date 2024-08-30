import prisma from '@/lib/prisma';
import { response, throwError } from '@/lib/utils';
import { Room } from '@prisma/client';
import { NextRequest } from 'next/server';
export async function GET() {
  try {
    const rooms = await prisma.room.findMany();

    return response(rooms);
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

export async function POST(request: NextRequest, room: Room) {
  try {
    const newRoom = await prisma.room.create({
      data: room,
    });
    return response(newRoom, 200);
  } catch (error) {
    console.log(error);
    return throwError();
  }
}

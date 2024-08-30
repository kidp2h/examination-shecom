import prisma from '@/lib/prisma';
import { response, throwError } from '@/lib/utils';
import { NextRequest } from 'next/server';
import validator from 'validator';
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (validator.isUUID(params.id)) {
    try {
      const room = await prisma.room.findUnique({
        where: {
          id: params.id,
        },
      });

      return response(room, 200);
    } catch (error) {
      console.log(error);
      return throwError();
    }
  }
  return throwError('Invalid id', 400);
}

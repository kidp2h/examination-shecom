import prisma, { handleError } from '@/lib/prisma';
import { response, throwError } from '@/lib/utils';
import { NextRequest } from 'next/server';
import validator from 'validator';
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (validator.isUUID(params.id)) {
    try {
      const booking = await prisma.booking.update({
        where: {
          id: params.id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return response(booking, 200);
    } catch (error) {
      /* istanbul ignore next */
      return handleError(error);
    }
  }
  return throwError('Invalid id', 400);
}

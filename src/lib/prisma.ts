import { throwError } from '@/lib/utils';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal || prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export const handleError = (error: any) => {
  switch (error.code) {
    case 'P2025':
      return throwError('Not found', 404);
    default:
      console.log(error);
      return throwError();
  }
};

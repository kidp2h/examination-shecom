import { faker } from '@faker-js/faker';
import { Room } from '@prisma/client';
import '@testing-library/jest-dom';
import { GET } from './route';

describe('route', () => {
  const room = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    price: +faker.commerce.price(),
    location: faker.location.street(),
    image_url: faker.image.url(),
  } as unknown as Room;

  const mockRequest = {} as any;
  it('GET /api/rooms/:id - should return 200 when ', async () => {
    const response = await GET(mockRequest, {
      params: {
        id: room.id,
      },
    });
    const body = await response?.json();

    expect(response?.status).toBe(200);
    expect(body.data).toBe(null);
  });
  it('GET /api/rooms/:id - should return error if invalid id', async () => {
    const response = await GET(mockRequest, {
      params: {
        id: 'wrong id',
      },
    });

    const body = await response?.json();

    expect(response?.status).toBe(400);
    expect(body.data).toBe(null);
  });
});

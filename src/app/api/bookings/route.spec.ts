import { faker } from '@faker-js/faker';
import { Room } from '@prisma/client';
import '@testing-library/jest-dom';
import validator from 'validator';
import { POST as createRoom } from '../rooms/route';
import { GET, POST } from './route';

describe('route', () => {
  const room = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    price: +faker.commerce.price(),
    location: faker.location.street(),
    image_url: faker.image.url(),
  } as Room;

  const mockRequest = {
    json: jest.fn().mockResolvedValue({
      information: {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        checkIn: faker.date.soon().toISOString(),
        checkOut: faker.date.future().toISOString(),
      },
      room,
    }),
  } as any;
  it('GET /api/bookings - should return 200', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  });
  it('POST /api/bookings - should return 200 ', async () => {
    const newRoom = await createRoom(mockRequest, room);

    const response = await POST(mockRequest);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(validator.isUUID(body.data.id)).toBe(true);
  });
});

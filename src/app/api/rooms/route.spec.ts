import { faker } from '@faker-js/faker';
import { Room } from '@prisma/client';
import '@testing-library/jest-dom';
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
  it('GET /api/rooms - should return 200 ', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  });
  it('POST /api/rooms - should return 200', async () => {
    const response = await POST(room);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.id).toBe(room.id);
  });
});

import { faker } from '@faker-js/faker';
import { Booking, Room, StatusBooking } from '@prisma/client';
import '@testing-library/jest-dom';
import { POST as createRoom } from '../rooms/route';
import { GET, POST } from './route';

describe('route', () => {
  const mockRequest = {} as any;
  const room = {
    id: faker.string.uuid(),
    name: faker.company.name(),
    description: faker.lorem.sentence(),
    price: +faker.commerce.price(),
    location: faker.location.street(),
    image_url: faker.image.url(),
  } as Room;
  const booking = {
    id: faker.string.uuid(),
    room_id: room.id,
    user_name: faker.internet.userName(),
    check_in_date: faker.date.recent(),
    check_out_date: faker.date.future(),
    status: StatusBooking.BOOKED,
  } as unknown as Booking;

  it('GET /api/bookings - should return 200', async () => {
    const response = await GET();

    expect(response.status).toBe(200);
  });
  it('POST /api/bookings - should return 200 ', async () => {
    const newRoom = await createRoom(mockRequest, room);

    const response = await POST(mockRequest, booking);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.data.id).toBe(booking.id);
  });
});

import { faker } from '@faker-js/faker';
import '@testing-library/jest-dom';
import { DELETE } from './route';

describe('route', () => {
  const mockRequest = {} as any;
  it('DELETE /api/bookings/:id - should return 404 when booking not found', async () => {
    const response = await DELETE(mockRequest, {
      params: {
        id: faker.string.uuid(),
      },
    });
    expect(response.status).toBe(404);
  });
});

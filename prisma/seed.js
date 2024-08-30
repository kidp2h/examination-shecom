const { faker } = require('@faker-js/faker');
const { log } = require('console');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const main = async () => {
  await prisma.booking.deleteMany({});
  await prisma.room.deleteMany({});
  let rooms = [];
  const bookings = [];
  const cities = async () => {
    const result = await fetch('https://provinces.open-api.vn/api/');
    return await result.json();
  };
  const listCities = await cities();
  console.log(listCities);

  for (let i = 0; i <= 50; i++) {
    const random = Math.floor(Math.random() * listCities.length);
    rooms.push(
      prisma.room.create({
        data: {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          price: +faker.commerce.price(),
          location: listCities[random].name,
          description: faker.lorem.paragraph(),
          image_url: faker.image.url(),
        },
      }),
    );
  }
  rooms = await Promise.all(rooms);
};
main().catch((e) => {
  console.log(e);
});

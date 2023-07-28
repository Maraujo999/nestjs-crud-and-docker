import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function run() {
  await prisma.usuario.deleteMany();

  const promises = [];

  for (let i = 0; i < 10; i++) {
    promises.push(
      prisma.usuario.create({
        data: {
          nome: faker.name.firstName() + faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
        },
      }),
    );
  }
  await Promise.all(promises);
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

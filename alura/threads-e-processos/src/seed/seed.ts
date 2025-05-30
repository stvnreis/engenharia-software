import { connectDB, closeDB } from "../db/connection";
import User from "../db/user.model";
import { faker } from "@faker-js/faker";

function generateUser() {
  return {
    name: faker.internet.username(),
    company: faker.company.name(),
    dateBirth: faker.date.past(),
    password: faker.internet.username() + "_PASSWORD",
    createdAt: faker.date.past({
      years: 10,
      refDate: new Date(),
    }),
    updatedAt: faker.date.past({
      years: 9,
      refDate: new Date(),
    }),
    lastPasswordUpdateAt: faker.date.past({
      years: 9,
      refDate: new Date(),
    }),
  };
}

async function seedUsers() {
  try {
    for (let i = 0; i < 200000; i++) {
      const user = generateUser();
      await User.create(user);
    }

    console.log("Usuarios inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir usuários", error);
  }
}

async function seedUsersBatch() {
  const batchSize = 1000;

  try {
    for (let i = 0; i < 200 * batchSize; i += batchSize) {
      const usersBatch = Array.from({ length: batchSize }, () =>
        generateUser()
      );

      // await Promise.all(usersBatch.map((user) => User.create(user)));

      await User.bulkCreate(usersBatch);

      console.log(`${i + batchSize} usuários inseridos`);
    }

    console.log("Usuarios inseridos com sucesso.");
  } catch (error) {
    console.error("Erro ao inserir usuários", error);
  }
}

(async () => {
  await connectDB();
  console.time("seed-db");
  await seedUsersBatch();
  console.timeEnd("seed-db");
  await closeDB();
})();

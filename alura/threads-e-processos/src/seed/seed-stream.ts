import { connectDB, closeDB } from "../db/connection";
import User from "../db/user.model";
import { faker } from "@faker-js/faker";
import { Readable } from "stream";

function generateUserStream(total: number) {
  let i = 0;

  return new Readable({
    objectMode: true,
    read() {
      if (i >= total) {
        return this.push(null);
      }

      const user = {
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
      i++;
      this.push(user);
    },
  });
}

async function insertUserStream(total: number) {
  const userStream = generateUserStream(total);
  const batchSize = 1000;
  let batch = [];

  for await (const user of userStream) {
    batch.push(user);

    if (batch.length >= batchSize) {
      try {
        await User.bulkCreate(batch);
        batch = [];
      } catch (error) {
        console.error("Error inserting user from stream", error);
      }
    }
  }

  if (batch.length > 0) {
    try {
      await User.bulkCreate(batch);
      batch = [];
    } catch (error) {
      console.error("Error inserting user from stream", error);
    }
  }
}

(async () => {
  await connectDB();
  console.time("insert-user-stream");
  await insertUserStream(200000);
  console.timeEnd("insert-user-stream");
  await closeDB();
})();

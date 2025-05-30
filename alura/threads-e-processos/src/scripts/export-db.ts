import { createWriteStream, createReadStream, mkdirSync, existsSync } from "fs";
import User from "../db/user.model";
import { Readable } from "stream";
import { pipeline } from "stream/promises";
import { closeDB, connectDB } from "../db/connection";

const dataDir = "./data";
if (!existsSync(dataDir)) {
  mkdirSync(dataDir);
}

async function* selectEntireDb() {
  const defaultLimit = 100;
  let skip = 0;

  while (true) {
    const data = await User.findAll({
      limit: defaultLimit,
      offset: skip,
      raw: true,
    });

    skip += defaultLimit;
  }
}

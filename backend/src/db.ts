import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const db = new Sequelize(
  process.env.DB!,
  process.env.PG_USER!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST,
    port: Number(process.env.PORT),
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default db;

import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
// The above code initializes a new Sequelize instance to connect to a PostgreSQL database named "auction".
// The database is hosted on an Amazon Web Services RDS instance with the specified host and port.
const db = new Sequelize(
  process.env.DB!,
  process.env.PG_USER!,
  process.env.PASSWORD!,
  {
    host: process.env.HOST,
    port: Number(process.env.DBPORT),
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,
  }
);

export default db;

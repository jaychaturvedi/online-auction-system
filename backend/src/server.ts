import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as bodyparser from "body-parser";
import db from "./db";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const PORT = Number(process.env.SPORT) || 5000;
db.sync({ alter: true }).then(() =>
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
);

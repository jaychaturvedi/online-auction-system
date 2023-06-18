import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as bodyparser from "body-parser";
import { expressErrorHandler } from "./utils/helper";
import userRouter from "./routes/userRouter";
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/api/users", userRouter);
app.use(expressErrorHandler);

export default app;

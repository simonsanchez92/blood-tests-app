import express, { Application, Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { db } from "./config/db";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config({ path: __dirname + "/config/.env" });

import indexRoute from "./routes";
import authRoute from "./routes/auth";
import appointmentsRoute from "./routes/appointments";

const app: Application = express();

//DB Connection
db.connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", authRoute);

app.use("/api/appointments", appointmentsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

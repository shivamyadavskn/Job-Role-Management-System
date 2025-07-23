import express, { Application, RequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jobRolesRouter from "./routes/jobroles";

const app: Application = express();

dotenv.config();

const mongoURI = process.env.MONGODB_URI || "";
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser() as unknown as RequestHandler);
app.use(express.static(path.join(__dirname, "public")));

app.use("/jobroles", jobRolesRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

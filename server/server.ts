import express from "express";
import { Application, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db Connection Successful");
});

connection.on("error", (err) => {
  console.log("Mongo Db Connection Failed");
});

// Routes
import usersRoute from "./routes/usersRoute";
import examsRoute from "./routes/examsRoute";
import reportsRoute from "./routes/reportsRoute";

const app: Application = express();

app.use(express.json());

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);
const port = process.env.PORT || 5000;

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

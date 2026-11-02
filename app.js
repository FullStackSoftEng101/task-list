import express, { urlencoded } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import usersRouter from "#api/users";
import tasksRouter from "#api/tasks";
import getUserFromToken from "./middleware/getUserFromToken";
const app = express();
export default app;

const __dirname = dirname(fileURLToPath(import.meta.url));
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flag: "a",
});
app.use(morgan("tiny", { stream: accessLogStream }));
function logger(req, res, next) {
  console.log("Request Method: ", req.method);
  console.log("Request URL: ", req.url);
  next();
}
app.use(logger);

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(getUserFromToken);

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});

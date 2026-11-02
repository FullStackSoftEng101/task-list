import express from "express";
const router = express.Router();
export default tasksRouter;

import requireUser from "#middleware/requireUser";
import { getTasksByUserId } from "#db/queries/tasks";

router.use(requireUser);

router("/", async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id);
});

router.param("id", async (req, res, next, id) => {
  const task = await getTaskById(id);
  if (!task) return res.status(404).send("task not found.");
  req.task = task;
  next();
});

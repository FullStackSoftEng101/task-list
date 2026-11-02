import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import {
  createTask,
  deleteTaskByiId,
  getTaskbyId,
  getTasksByUserId,
  updateTaskById,
} from "#db/queries/tasks";
import requireBody from "#middleware/requireBody";

router.use(requireUser);

router.get("/", async (req, res) => {
  const tasks = await getTasksByUserId(req.user.id);
  res.send(tasks);
});

router.post("/", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const task = await createTask(title, done, req.user.id);
  res.status(201).send(task);
});

router.param("id", async (req, res, next, id) => {
  const task = await getTaskbyId(id);
  if (!task) return res.status(404).send("task not found.");

  if (req.user.id !== task.user_id)
    return res.status(403).send("This is not your task.");

  req.task = task;
  next();
});

router.delete("/:id", async (req, res) => {
  await deleteTaskByiId(req.task.id);
  res.sendStatus(204);
});

router.put("/:id", requireBody(["title", "done"]), async (req, res) => {
  const { title, done } = req.body;
  const task = await updateTaskById(req.task.id, title, done);
  res.send(task);
});

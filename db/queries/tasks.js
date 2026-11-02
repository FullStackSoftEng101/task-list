import db from "#db/client";

export async function createTask(
  title,
  description,
  date,
  priority,
  done,
  userId,
) {
  const sql = `
  INSERT INTO tasks
  (title, description,  date, priority, done, user_id)
VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `;
  const { rows: task } = await db.query(sql, [
    title,
    description,
    date,
    priority,
    done,
    userId,
  ]);
  return task;
}

export async function getTasksByUserId(id) {
  const sql = `
  SELECT *
  FROM tasks
  WHERE user_id=$1`;

  const { rows: tasks } = await db.query(sql, [id]);
  return reservations;
}
export async function getTaskbyId(id) {
  const sql = `
  SELECT * 
  FROM tasks
  WHERE id=$1
  `;

  const {
    rows: [reservation],
  } = await db.query(sql, [id]);
  return reservation;
}

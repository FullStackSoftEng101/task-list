import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

export async function seed() {
  // Create 5 users
  for (let i = 1; i <= 5; i++) {
    const username = faker.internet.displayName();
    const user = await createUser(username + i, "password");

    // Each user gets 12 tasks
    for (let j = 1; j <= 5; j++) {
      // const priority = Math.floor(Math.random() * 10) + 1;

      // const iso = faker.date.recent();
      // const description = faker.hacker.phrase();
      // const date = iso.toISOString().slice(0, 10);

      // const done = false;

      const task = await createTask(
        "Task name " + j,
        // description,
        // date,
        // priority,
        false,
        user.id,
      );

      // Priority 1–10
      //  const priority = Math.floor(Math.random() * 10) + 1;
      //const priority = faker.number.int({ min: 1, max: 10 })
      // Insert into users_tasks join table
      // await createUserTask(user.id, task.id, priority);
    }
  }
}

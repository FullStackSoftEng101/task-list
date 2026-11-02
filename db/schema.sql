DROP TABLE IF EXISTS users_tasks;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text UNIQUE NOT NULL,
    password text NOT NULL
);

CREATE TABLE tasks (
    id serial PRIMARY KEY,
    title text NOT NULL,
    -- description text NOT NULL,
    -- date date NOT NULL,
    -- priority int NOT NULL,
    done boolean NOT NULL DEFAULT false,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- CREATE TABLE users_tasks (
--     user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     task_id int NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
--     priority int NOT NULL,
--     PRIMARY KEY (user_id, task_id)
-- );

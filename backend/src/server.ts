import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createTables, openDb } from "./db/database";

dotenv.config(); // 環境変数読み込み

const app: Express = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world from toki-log backend!");
});

// task開始
app.post("/api/tasks/start", async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const startTime = new Date();
  try {
    //const db = await dbPromise;
    const db = await openDb();
    const result = await db.run(
      `INSERT INTO tasks (name, description, start_time) VALUES (?, ?, ?)`,
      name,
      description,
      startTime
    );
    res
      .status(201)
      .send({ id: result.lastID, message: "Task started successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to start a new task." });
  }
});

// task停止
app.post("/api/tasks/stop", async (req: Request, res: Response) => {
  const { id } = req.body;
  const endTime = new Date();
  try {
    //const db = await dbPromise;
    const db = await openDb();
    await db.run(`UPDATE tasks SET end_time = ? WHERE id = ?`, endTime, id);
    res.status(200).send({ message: "Task stopped successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to end the task" });
  }
});

// task一覧取得
app.get("/api/tasks", async (req: Request, res: Response) => {
  try {
    //const db = await dbPromise;
    const db = await openDb();
    const tasks = await db.all("SELECT * FROM tasks ORDER BY start_time DESC");
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve tasks." });
  }
});

// task編集
app.put("/api/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, start_time, end_time } = req.body;

  try {
    const db = await openDb();
    const result = await db.run(
      `UPDATE tasks SET
      name = COALESCE(?, name),
      description = COALESCE(?, description),
      start_time = COALESCE(?, start_time),
      end_time = COALESCE(?, end_time)
      WHERE id = ?`,
      [name, description, start_time, end_time, id]
    );

    if (result.changes && result.changes > 0) {
      res
        .status(200)
        .json({ message: "Task updated successfully", id: id, name: name });
    } else {
      res.status(404).send({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update task" });
  }
});

// task削除
app.delete("/api/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const db = await openDb();
    const result = await db.run(`DELETE FROM tasks WHERE id = ?`, id);

    if (result.changes && result.changes > 0) {
      res.status(200).json({ message: "Task deleted successfully" });
    } else {
      res.status(404).send({ error: "Task not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete task" });
  }
});

// user一覧取得
app.get("/api/users", async (req: Request, res: Response) => {
  try {
    const db = await openDb();
    const tasks = await db.all("SELECT * FROM users;");
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to retrieve users" });
  }
});

// user作成
app.post("/api/users", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const db = await openDb();
    const result = await db.run(`INSERT INTO users (name) VALUES (?)`, name);
    res.status(201).send({
      id: result.lastID,
      name: name,
      message: "User created successfully.",
    });
  } catch (error) {
    const sqliteError = error as SQLiteError;
    if (
      sqliteError.message ===
      "SQLITE_CONSTRAINT: UNIQUE constraint failed: users.name"
    ) {
      res.status(500).send({ error: "Username already exists." });
    } else {
      res.status(500).send({ error: "Failed to create a new user." });
    }
  }
});

// user情報編集
app.put("/api/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const db = await openDb();
    const result = await db.run(
      `UPDATE users SET name = COALESCE(?, name) WHERE id = ?`,
      [name, id]
    );

    if (result.changes && result.changes > 0) {
      res
        .status(200)
        .json({ message: "User updated successfully", id: id, name: name });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update user" });
  }
});

// user情報削除
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const db = await openDb();
    const result = await db.run(`DELETE FROM users WHERE id = ?`, id);

    if (result.changes && result.changes > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete user" });
  }
});

// サーバー起動とDB初期設定
async function startServer(): Promise<void> {
  try {
    await createTables();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server", error);
  }
}

startServer();

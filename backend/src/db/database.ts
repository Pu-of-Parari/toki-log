import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

const dbPath = path.resolve(__dirname, "toki-log.db");

export async function openDb(): Promise<Database> {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}

export async function createTables(): Promise<void> {
  const db = await openDb();
  try {
    await db.exec(`CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL
      );
    `);

    await db.exec(`CREATE TABLE IF NOT EXISTS tasks(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          start_time DATETIME,
          end_time DATETIME,
          created_by INTEGER,
          FOREIGN KEY (created_by) REFERENCES users (id)
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS tags(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL
      );`);

    await db.exec(`CREATE TABLE IF NOT EXISTS task_tags(
          task_id INTEGER,
          tag_id INTEGER,
          FOREIGN KEY (task_id) REFERENCES tasks (id),
          FOREIGN KEY (tag_id) REFERENCES tags (id),
          PRIMARY KEY (task_id, tag_id)
      );`);
    console.log("Table created");
  } catch (error) {
    console.error("Error createing tables:", error);
    throw error;
  }
}

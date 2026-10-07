import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync(new URL("./artisan.db", import.meta.url));
db.exec("PRAGMA foreign_keys = ON;");

db.exec(`
  CREATE TABLE IF NOT EXISTS artisans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    craft TEXT NOT NULL,
    village TEXT,
    story TEXT,
    photo TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artisan_id INTEGER NOT NULL REFERENCES artisans(id),
    name TEXT NOT NULL,
    description TEXT,
    craft_story TEXT,
    price INTEGER NOT NULL,
    image TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL REFERENCES products(id),
    buyer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    total INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'placed',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS custom_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artisan_id INTEGER NOT NULL REFERENCES artisans(id),
    buyer_name TEXT NOT NULL,
    contact TEXT NOT NULL,
    description TEXT NOT NULL,
    budget INTEGER,
    reference_image TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS contributions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artisan_id INTEGER NOT NULL REFERENCES artisans(id),
    supporter_name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;
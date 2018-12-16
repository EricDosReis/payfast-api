const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const PAYMENT_SCHEMA = `
  CREATE TABLE IF NOT EXISTS payment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    value REAL NOT NULL
  )
`;

db.serialize(() => {
  db.run("PRAGMA foreign_keys=ON");
  db.run(PAYMENT_SCHEMA);
});

process.on('SIGINT', () =>
  db.close(() => {
    process.exit(0);
  })
);

module.exports = db;

/**
 * SQLite Database using sql.js (pure JavaScript, no native binaries needed)
 * Reads/writes BSDB.db file
 */

const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../database/ad2bs.db');

let db = null;
let SQL = null;

async function getDB() {
  if (db) return db;

  SQL = await initSqlJs();

  // Load existing DB file or create new
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
    console.log(`📂 Loaded existing database: ${DB_PATH}`);
  } else {
    db = new SQL.Database();
    console.log(`🆕 Created new database: ${DB_PATH}`);
  }

  initSchema();
  return db;
}

function initSchema() {
  db.run(`
    CREATE TABLE IF NOT EXISTS bs_calendar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bs_year INTEGER NOT NULL,
      bs_month INTEGER NOT NULL,
      days INTEGER NOT NULL,
      start_ad_year INTEGER NOT NULL,
      start_ad_month INTEGER NOT NULL,
      start_ad_day INTEGER NOT NULL
    );
  `);

  db.run(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_bs_year_month ON bs_calendar(bs_year, bs_month);
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS conversion_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      direction TEXT NOT NULL,
      input_date TEXT NOT NULL,
      output_date TEXT NOT NULL,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function saveDB() {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, buffer);
  } catch (e) {
    console.error('Error saving DB:', e.message);
  }
}

// Helper: run a query that returns rows
function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// Helper: run a query that returns one row
function queryOne(sql, params = []) {
  const rows = queryAll(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

// Helper: run an insert/update/delete
function run(sql, params = []) {
  db.run(sql, params);
}

module.exports = { getDB, saveDB, queryAll, queryOne, run };

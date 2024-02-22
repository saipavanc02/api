const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the database');
    initDatabase();
  }
});

function initDatabase() {
    db.run(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Companies table
  db.run(`
    CREATE TABLE IF NOT EXISTS Companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      employees INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create Clients table
  db.run(`
    CREATE TABLE IF NOT EXISTS Clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company_id INTEGER,
      user_id INTEGER,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES Companies(id),
      FOREIGN KEY (user_id) REFERENCES Users(id)
    )
  `);

  // Create ClientUsers table
  db.run(`
    CREATE TABLE IF NOT EXISTS ClientUsers (
      clientId INTEGER,
      userId INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME,
      deletedAt DATETIME,
      active BOOLEAN,
      PRIMARY KEY (clientId, userId),
      FOREIGN KEY (clientId) REFERENCES Clients(id),
      FOREIGN KEY (userId) REFERENCES Users(id)
    )
  `);

  console.log('Database tables initialized');
}

module.exports = db;

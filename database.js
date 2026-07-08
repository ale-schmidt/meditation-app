const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = process.env.DATABASE_PATH
  ? path.resolve(process.env.DATABASE_PATH)
  : path.resolve(__dirname, 'meditation.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite.');
  }
});

// Crear tablas
db.serialize(() => {
  // Tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_admin INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de códigos temporales (para verificación de signup)
  // El código expira a los 5 minutos (lo controla el servidor con expires_at)
  db.run(`
    CREATE TABLE IF NOT EXISTS temporary_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      full_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de meditaciones completadas
  db.run(`
    CREATE TABLE IF NOT EXISTS meditations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      user_name TEXT NOT NULL,
      duration INTEGER DEFAULT 0,
      completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Intentar agregar la columna duration en caso de que la tabla ya existiera previamente
  db.run(`ALTER TABLE meditations ADD COLUMN duration INTEGER DEFAULT 0`, (err) => {
    // Silenciar error si la columna ya existe
  });

  // Intentar agregar la columna is_admin a users en caso de que la tabla ya existiera
  db.run(`ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0`, (err) => {
    // Silenciar error si la columna ya existe
  });

  // Forzar que SOLAMENTE el correo alemusho@gmail.com sea administrador, y los demás sean usuarios normales
  db.run(`UPDATE users SET is_admin = 1 WHERE email = 'alemusho@gmail.com'`);
  db.run(`UPDATE users SET is_admin = 0 WHERE email != 'alemusho@gmail.com'`);


  // Tabla de configuración general
  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `, () => {
    // Si la tabla de configuración está vacía, cargar valores desde .env
    db.get("SELECT COUNT(*) as count FROM settings", [], (err, row) => {
      if (!err && row && row.count === 0) {
        db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['EMAIL_USER', process.env.EMAIL_USER || '']);
        db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['EMAIL_PASS', process.env.EMAIL_PASS || '']);
      }
    });
  });

  console.log('✅ Tablas verificadas/creadas correctamente.');
});

// Función utilitaria para limpiar códigos expirados automáticamente
function cleanExpiredCodes() {
  db.run(
    `DELETE FROM temporary_codes WHERE expires_at < datetime('now')`,
    (err) => {
      if (err) console.error('Error limpiando códigos expirados:', err.message);
    }
  );
}

// Limpiar códigos expirados cada 2 minutos
setInterval(cleanExpiredCodes, 2 * 60 * 1000);

module.exports = { db, cleanExpiredCodes };

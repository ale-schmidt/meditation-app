const { Pool } = require('pg');

const databaseUrl = process.env.DATABASE_URL;

// Inicializar Pool de conexiones PostgreSQL
const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl && (databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1'))
    ? false
    : { rejectUnauthorized: false }
});

pool.on('error', (err) => {
  console.error('Error inesperado en el cliente de base de datos Postgres:', err);
});

// Helper para convertir sintaxis SQLite a PostgreSQL
function convertSql(sql) {
  let index = 1;
  // Reemplazar ? por $1, $2, ...
  let newSql = sql.replace(/\?/g, () => `$${index++}`);

  // Auto-increment
  newSql = newSql.replace(/INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY');

  // INSERT OR REPLACE en settings
  if (newSql.toUpperCase().includes('INSERT OR REPLACE INTO settings')) {
    newSql = newSql.replace(/INSERT\s+OR\s+REPLACE\s+INTO\s+settings\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi,
      'INSERT INTO settings ($1) VALUES ($2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value');
  }

  // Tiempos SQLite -> Postgres
  newSql = newSql.replace(/datetime\('now',\s*'\+5\s+minutes'\)/gi, "NOW() + INTERVAL '5 minutes'");
  newSql = newSql.replace(/datetime\('now'\)/gi, "NOW()");

  return newSql;
}

// Adaptador db compatible con sqlite3
const db = {
  serialize(callback) {
    if (callback) callback();
  },

  run(sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }

    let querySql = convertSql(sql);

    // Auto-retornar ID en inserciones para emular this.lastID
    const isInsert = querySql.trim().toUpperCase().startsWith('INSERT');
    if (isInsert && !querySql.toUpperCase().includes('RETURNING')) {
      querySql += ' RETURNING id';
    }

    pool.query(querySql, params || [], (err, res) => {
      const context = {
        lastID: undefined,
        changes: undefined
      };
      if (!err && res) {
        context.changes = res.rowCount;
        if (res.rows && res.rows.length > 0 && res.rows[0].id !== undefined) {
          context.lastID = res.rows[0].id;
        }
      }
      if (callback) {
        callback.call(context, err);
      }
    });
  },

  get(sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }

    const querySql = convertSql(sql);
    pool.query(querySql, params || [], (err, res) => {
      if (callback) {
        const row = (!err && res && res.rows.length > 0) ? res.rows[0] : undefined;
        callback(err, row);
      }
    });
  },

  all(sql, params, callback) {
    if (typeof params === 'function') {
      callback = params;
      params = [];
    }

    const querySql = convertSql(sql);
    pool.query(querySql, params || [], (err, res) => {
      if (callback) {
        const rows = (!err && res) ? res.rows : [];
        callback(err, rows);
      }
    });
  }
};

// Crear tablas si no existen al arrancar
db.serialize(() => {
  // Tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      is_admin INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de códigos temporales (para verificación de signup)
  db.run(`
    CREATE TABLE IF NOT EXISTS temporary_codes (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      full_name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      code TEXT NOT NULL,
      expires_at TIMESTAMP NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabla de meditaciones completadas
  db.run(`
    CREATE TABLE IF NOT EXISTS meditations (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      user_name TEXT NOT NULL,
      duration INTEGER DEFAULT 0,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Intentar agregar columnas por si existían antes de la migración
  db.run(`ALTER TABLE meditations ADD COLUMN IF NOT EXISTS duration INTEGER DEFAULT 0`, (err) => {});
  db.run(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin INTEGER DEFAULT 0`, (err) => {});

  // Forzar que SOLAMENTE alemusho@gmail.com sea admin
  db.run(`UPDATE users SET is_admin = 1 WHERE email = 'alemusho@gmail.com'`);
  db.run(`UPDATE users SET is_admin = 0 WHERE email != 'alemusho@gmail.com'`);

  // Tabla de configuración general
  db.run(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `, () => {
    db.get("SELECT COUNT(*) as count FROM settings", [], (err, row) => {
      if (!err && row && parseInt(row.count) === 0) {
        db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['EMAIL_USER', process.env.EMAIL_USER || '']);
        db.run("INSERT INTO settings (key, value) VALUES (?, ?)", ['EMAIL_PASS', process.env.EMAIL_PASS || '']);
      }
    });
  });

  // Tabla de hábitos del administrador
  db.run(`
    CREATE TABLE IF NOT EXISTS admin_habits (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL,
      habit_name TEXT NOT NULL,
      notes TEXT,
      completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Tablas verificadas/creadas correctamente en PostgreSQL.');
});

// Limpiar códigos expirados automáticamente
function cleanExpiredCodes() {
  db.run(
    `DELETE FROM temporary_codes WHERE expires_at < NOW()`,
    (err) => {
      if (err) console.error('Error limpiando códigos expirados:', err.message);
    }
  );
}

// Limpiar códigos expirados cada 2 minutos
setInterval(cleanExpiredCodes, 2 * 60 * 1000);

module.exports = { db, cleanExpiredCodes };

require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
const { db } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'meditation_secret_key_change_in_production';
const SIX_MONTHS_MS = 6 * 30 * 24 * 60 * 60 * 1000;

// ──────────────────────────────────────────────
// Middleware
// ──────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));



async function sendVerificationEmail(email, fullName, code, lang = 'es') {
  const resendApiKey = process.env.RESEND_API_KEY;

  const isEs = lang === 'es';
  const subject = isEs ? 'Tu código de verificación - Meditación App' : 'Your verification code - Meditation App';
  const welcomeText = isEs
    ? `Hola, <strong>${fullName}</strong>. Aquí está tu código de verificación:`
    : `Hello, <strong>${fullName}</strong>. Here is your verification code:`;
  const expiryText = isEs
    ? `⏳ Este código expira en <strong>5 minutos</strong>.`
    : `⏳ This code expires in <strong>5 minutes</strong>.`;
  const ignoreText = isEs
    ? `Si no solicitaste este código, puedes ignorar este correo.`
    : `If you did not request this code, you can ignore this email.`;

  if (resendApiKey) {
    console.log(`[Email] Enviando verificación a ${email} vía Resend HTTP API (${lang})...`);
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Meditacion App <onboarding@resend.dev>',
        to: email,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; background: #1a1a2e; color: #e2e8f0; border-radius: 12px; padding: 32px;">
            <h2 style="color: #a78bfa; text-align: center; margin-bottom: 8px;">🧘 ${isEs ? 'Meditación App' : 'Meditation App'}</h2>
            <p style="text-align: center; color: #94a3b8;">${welcomeText}</p>
            <div style="background: #2d2d5e; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
              <span style="font-size: 48px; font-weight: bold; letter-spacing: 12px; color: #c4b5fd;">${code}</span>
            </div>
            <p style="text-align: center; color: #64748b; font-size: 14px;">${expiryText}</p>
            <p style="text-align: center; color: #64748b; font-size: 12px;">${ignoreText}</p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(`Resend API error: ${JSON.stringify(errData)}`);
    }
    return;
  }

  const config = await getEmailConfig();

  // Si no hay credenciales de email configuradas, imprimir en consola (modo desarrollo)
  if (!config.EMAIL_USER || !config.EMAIL_PASS) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 [MODO DESARROLLO - No se envía email real (${lang})]`);
    console.log(`   Para: ${email}`);
    console.log(`   Nombre: ${fullName}`);
    console.log(`   ✨ CÓDIGO DE VERIFICACIÓN: ${code}`);
    console.log(isEs ? '   (El código expira en 5 minutos)' : '   (Code expires in 5 minutes)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    return;
  }

  const dynamicTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });

  const textContent = isEs
    ? `Hola, ${fullName}.\n\nTu código de verificación es: ${code}\n\nEste código expira en 5 minutos.`
    : `Hello, ${fullName}.\n\nYour verification code is: ${code}\n\nThis code expires in 5 minutes.`;

  await dynamicTransporter.sendMail({
    from: `"Meditación App" <${config.EMAIL_USER}>`,
    to: email,
    subject: subject,
    text: textContent,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto; background: #1a1a2e; color: #e2e8f0; border-radius: 12px; padding: 32px;">
        <h2 style="color: #a78bfa; text-align: center; margin-bottom: 8px;">🧘 ${isEs ? 'Meditación App' : 'Meditation App'}</h2>
        <p style="text-align: center; color: #94a3b8;">${welcomeText}</p>
        <div style="background: #2d2d5e; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
          <span style="font-size: 48px; font-weight: bold; letter-spacing: 12px; color: #c4b5fd;">${code}</span>
        </div>
        <p style="text-align: center; color: #64748b; font-size: 14px;">${expiryText}</p>
        <p style="text-align: center; color: #64748b; font-size: 12px;">${ignoreText}</p>
      </div>
    `,
  });
}

// ──────────────────────────────────────────────
// Middleware de autenticación
// ──────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.cookies.session_token;
  if (!token) return res.status(401).json({ error: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Sesión inválida o expirada' });
  }
}

function adminMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user && req.user.is_admin === 1) {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado: se requieren permisos de administrador' });
    }
  });
}

function getEmailConfig() {
  return new Promise((resolve) => {
    db.all("SELECT key, value FROM settings WHERE key IN ('EMAIL_USER', 'EMAIL_PASS')", [], (err, rows) => {
      const config = {
        EMAIL_USER: process.env.EMAIL_USER || '',
        EMAIL_PASS: process.env.EMAIL_PASS || ''
      };
      if (!err && rows && rows.length > 0) {
        rows.forEach(r => {
          config[r.key] = r.value;
        });
      }
      resolve(config);
    });
  });
}

// GET /api/health → Health check endpoint for keep-alive monitoring
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ──────────────────────────────────────────────
// RUTAS DE AUTENTICACIÓN
// ──────────────────────────────────────────────

// POST /api/signup → Recibe datos, hashea contraseña, genera código, envía email
app.post('/api/signup', async (req, res) => {
  try {
    const { full_name, email, password, lang } = req.body;

    // Validaciones básicas del servidor
    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Verificar si el email ya está registrado
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) return res.status(500).json({ error: 'Error interno del servidor' });
      if (user) return res.status(409).json({ error: 'Este email ya está registrado. Por favor, inicia sesión.' });

      // Generar código de 4 dígitos
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // +5 minutos

      // Hashear contraseña
      const passwordHash = await bcrypt.hash(password, 12);

      // Borrar cualquier código anterior para este email
      db.run('DELETE FROM temporary_codes WHERE email = ?', [email], async (delErr) => {
        if (delErr) return res.status(500).json({ error: 'Error interno del servidor' });

        // Guardar código temporal
        db.run(
          'INSERT INTO temporary_codes (email, full_name, password_hash, code, expires_at) VALUES (?, ?, ?, ?, ?)',
          [email, full_name, passwordHash, code, expiresAt],
          async (insertErr) => {
            if (insertErr) return res.status(500).json({ error: 'Error al guardar código temporal' });

            // Loggear el código en consola para facilitar pruebas si hay bloqueos de puertos de red
            console.log(`🔑 [CÓDIGO DE VERIFICACIÓN] Para: ${email} -> Código: ${code}`);

            // Enviar email
            try {
              await sendVerificationEmail(email, full_name, code, lang);
              res.json({ success: true, message: 'Código enviado al correo electrónico' });
            } catch (emailErr) {
              console.error('Error enviando email:', emailErr);
              res.status(500).json({ error: 'Error al enviar el correo de verificación' });
            }
          }
        );
      });
    });
  } catch (error) {
    console.error('Error en /api/signup:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/verify-code → Verifica código y crea la cuenta
app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'Email y código son requeridos' });

  db.get(
    `SELECT * FROM temporary_codes WHERE email = ? AND code = ? AND expires_at > datetime('now')`,
    [email, code],
    (err, row) => {
      if (err) return res.status(500).json({ error: 'Error interno del servidor' });
      if (!row) return res.status(400).json({ error: 'Código incorrecto o expirado' });

      // Crear el usuario
      const isEmailAdmin = (email === 'alemusho@gmail.com') ? 1 : 0;
      db.run(
        'INSERT INTO users (full_name, email, password_hash, is_admin) VALUES (?, ?, ?, ?)',
        [row.full_name, email, row.password_hash, isEmailAdmin],
        function (insertErr) {
          if (insertErr) {
            if (insertErr.message.includes('UNIQUE')) {
              return res.status(409).json({ error: 'Este email ya está registrado' });
            }
            return res.status(500).json({ error: 'Error al crear la cuenta' });
          }

          const userId = this.lastID;

          // Borrar código temporal
          db.run('DELETE FROM temporary_codes WHERE email = ?', [email]);

          // Crear sesión (cookie 6 meses)
          const token = jwt.sign(
            { id: userId, email: email, full_name: row.full_name, is_admin: isEmailAdmin },
            JWT_SECRET,
            { expiresIn: '180d' }
          );

          res.cookie('session_token', token, {
            httpOnly: true,
            maxAge: SIX_MONTHS_MS,
            sameSite: 'lax',
          });

          res.json({
            success: true,
            message: '¡Cuenta creada exitosamente!',
            user: { id: userId, full_name: row.full_name, email, is_admin: isEmailAdmin },
          });
        }
      );
    }
  );
});

// POST /api/resend-code → Reenvía el código (regenera uno nuevo)
app.post('/api/resend-code', async (req, res) => {
  const { email, lang } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requerido' });

  db.get('SELECT * FROM temporary_codes WHERE email = ?', [email], async (err, row) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    if (!row) return res.status(404).json({ error: 'No hay solicitud de registro pendiente para este email' });

    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

    db.run(
      'UPDATE temporary_codes SET code = ?, expires_at = ? WHERE email = ?',
      [newCode, newExpiresAt, email],
      async (updateErr) => {
        if (updateErr) return res.status(500).json({ error: 'Error al regenerar el código' });

        try {
          await sendVerificationEmail(email, row.full_name, newCode, lang);
          res.json({ success: true, message: 'Nuevo código enviado' });
        } catch {
          res.status(500).json({ error: 'Error al enviar el correo' });
        }
      }
    );
  });
});

// POST /api/login → Inicia sesión con email y contraseña
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email y contraseña requeridos' });

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    if (!user) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    const token = jwt.sign(
      { id: user.id, email: user.email, full_name: user.full_name, is_admin: user.is_admin || 0 },
      JWT_SECRET,
      { expiresIn: '180d' }
    );

    res.cookie('session_token', token, {
      httpOnly: true,
      maxAge: SIX_MONTHS_MS,
      sameSite: 'lax',
    });

    res.json({
      success: true,
      user: { id: user.id, full_name: user.full_name, email: user.email, is_admin: user.is_admin || 0 },
    });
  });
});

// POST /api/logout → Cierra sesión
app.post('/api/logout', (req, res) => {
  res.clearCookie('session_token');
  res.json({ success: true });
});

// GET /api/me → Verifica si la sesión es válida (para cargar al inicio)
app.get('/api/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// DELETE /api/account → Elimina la cuenta del usuario
app.delete('/api/account', authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar la cuenta' });
    if (this.changes === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.clearCookie('session_token');
    res.json({ success: true, message: 'Cuenta eliminada correctamente' });
  });
});

// PUT /api/account/password → Cambia la contraseña del usuario logueado
app.put('/api/account/password', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Validaciones del lado del servidor para contraseña nueva
  const hasUpper = /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);
  if (newPassword.length < 6 || !hasUpper || !hasNumber || !hasSymbol) {
    return res.status(400).json({ error: 'La nueva contraseña no cumple con los requisitos mínimos de seguridad' });
  }

  db.get('SELECT password_hash FROM users WHERE id = ?', [userId], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!valid) {
      return res.status(400).json({ error: 'La contraseña actual es incorrecta' });
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);
    db.run('UPDATE users SET password_hash = ? WHERE id = ?', [hashedNew, userId], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: 'Error al actualizar la contraseña' });
      res.json({ success: true, message: 'Contraseña cambiada con éxito' });
    });
  });
});

// GET /api/admin/settings → Retorna la configuración de correo (sólo para administradores)
app.get('/api/admin/settings', adminMiddleware, async (req, res) => {
  try {
    const config = await getEmailConfig();
    res.json(config);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
});

// POST /api/admin/settings → Guarda la configuración de correo (sólo para administradores)
app.post('/api/admin/settings', adminMiddleware, (req, res) => {
  const { EMAIL_USER, EMAIL_PASS } = req.body;
  if (EMAIL_USER === undefined || EMAIL_PASS === undefined) {
    return res.status(400).json({ error: 'Configuración incompleta' });
  }

  db.serialize(() => {
    db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['EMAIL_USER', EMAIL_USER]);
    db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', ['EMAIL_PASS', EMAIL_PASS], (err) => {
      if (err) {
        console.error('[Admin Settings] Error saving settings:', err);
        return res.status(500).json({ error: 'Error al guardar la configuración' });
      }
      res.json({ success: true, message: 'Configuración guardada correctamente' });
    });
  });
});

// GET /api/admin/users → Retorna la lista de usuarios (sólo para administradores)
app.get('/api/admin/users', adminMiddleware, (req, res) => {
  db.all('SELECT id, full_name, email, is_admin FROM users ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      console.error('[Admin Users GET] Error fetching users:', err);
      return res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
    res.json(rows);
  });
});

// PUT /api/admin/users/:id → Actualiza datos de un usuario (sólo para administradores)
app.put('/api/admin/users/:id', adminMiddleware, (req, res) => {
  const userId = parseInt(req.params.id);
  const { full_name, email, is_admin } = req.body;

  if (!full_name || !email || is_admin === undefined) {
    return res.status(400).json({ error: 'Datos de usuario incompletos o inválidos' });
  }

  // Si un admin intenta cambiarse a sí mismo a no-admin, bloquear para prevenir orfandad de admins
  if (userId === req.user.id && parseInt(is_admin) !== 1) {
    return res.status(400).json({ error: 'No puedes remover tu propio rol de administrador' });
  }

  db.run(
    'UPDATE users SET full_name = ?, email = ?, is_admin = ? WHERE id = ?',
    [full_name, email, is_admin, userId],
    function (err) {
      if (err) {
        console.error('[Admin Users PUT] Error updating user:', err);
        if (err.message.includes('UNIQUE')) {
          return res.status(409).json({ error: 'Este correo electrónico ya está registrado por otro usuario' });
        }
        return res.status(500).json({ error: 'Error al actualizar el usuario' });
      }
      res.json({ success: true, message: 'Usuario actualizado correctamente' });
    }
  );
});

// DELETE /api/admin/users/:id → Elimina un usuario (sólo para administradores)
app.delete('/api/admin/users/:id', adminMiddleware, (req, res) => {
  const userId = parseInt(req.params.id);

  if (userId === req.user.id) {
    return res.status(400).json({ error: 'No puedes eliminarte a ti mismo desde la lista de configuración' });
  }

  db.run('DELETE FROM users WHERE id = ?', [userId], function (err) {
    if (err) {
      console.error('[Admin Users DELETE] Error deleting user:', err);
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    // Borrar las meditaciones asociadas también
    db.run('DELETE FROM meditations WHERE user_id = ?', [userId]);
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  });
});

// ──────────────────────────────────────────────
// RUTAS DE MEDITACIONES
// ──────────────────────────────────────────────

// POST /api/meditations → Guarda una meditación completada
app.post('/api/meditations', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const userName = req.user.full_name;
  const { duration } = req.body; // duración en segundos

  const completedAtISO = new Date().toISOString(); // Guarda en ISO UTC para parseo local en frontend

  db.run(
    'INSERT INTO meditations (user_id, user_name, duration, completed_at) VALUES (?, ?, ?, ?)',
    [userId, userName, duration || 0, completedAtISO],
    function (err) {
      if (err) return res.status(500).json({ error: 'Error al guardar la meditación' });
      res.json({
        success: true,
        meditation: { id: this.lastID, user_name: userName, duration: duration || 0, completed_at: completedAtISO },
      });
    }
  );
});

// GET /api/meditations → Obtiene las meditaciones del usuario logueado
app.get('/api/meditations', authMiddleware, (req, res) => {
  const userId = req.user.id;

  db.all(
    'SELECT * FROM meditations WHERE user_id = ? ORDER BY completed_at DESC',
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: 'Error al obtener las meditaciones' });
      res.json({ meditations: rows, total: rows.length });
    }
  );
});

// DELETE /api/meditations/:id → Elimina una meditación específica del usuario logueado
app.delete('/api/meditations/:id', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const meditationId = req.params.id;

  // Verificar que la meditación pertenece al usuario
  db.get('SELECT user_id FROM meditations WHERE id = ?', [meditationId], (err, row) => {
    if (err) return res.status(500).json({ error: 'Error interno del servidor' });
    if (!row) return res.status(404).json({ error: 'Meditación no encontrada' });
    if (row.user_id !== userId) return res.status(403).json({ error: 'No tienes permiso para eliminar esta meditación' });

    // Eliminar
    db.run('DELETE FROM meditations WHERE id = ?', [meditationId], (deleteErr) => {
      if (deleteErr) return res.status(500).json({ error: 'Error al eliminar la meditación' });
      res.json({ success: true, message: 'Meditación eliminada' });
    });
  });
});

// ──────────────────────────────────────────────
// Planificador y Enviador de Reportes de Meditación
// ──────────────────────────────────────────────
function formatExactDurationForEmail(seconds, lang) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
  return parts.join(' ');
}

async function sendReportToUser(user, callback) {
  const config = await getEmailConfig();

  db.all(
    'SELECT completed_at, duration FROM meditations WHERE user_id = ?',
    [user.id],
    (medErr, meditations) => {
      if (medErr) {
        console.error(`[Report] Error select meditations for user ${user.email}:`, medErr);
        if (callback) callback(medErr);
        return;
      }

      const today = new Date();

      // Lunes de la semana actual
      const currentDayOfWeek = today.getDay();
      const daysOffset = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - daysOffset);
      monday.setHours(0, 0, 0, 0);

      // Primer día del mes actual
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      // Cálculo semanal
      const weekMeditations = meditations.filter(m => new Date(m.completed_at) >= monday);
      const weekDuration = weekMeditations.reduce((acc, m) => acc + (m.duration || 0), 0);
      const weekComplete = weekMeditations.filter(m => (m.duration || 0) >= 3600).length;
      const weekPartial = weekMeditations.filter(m => (m.duration || 0) < 3600).length;

      // Cálculo mensual
      const monthMeditations = meditations.filter(m => new Date(m.completed_at) >= firstDayOfMonth);
      const monthDuration = monthMeditations.reduce((acc, m) => acc + (m.duration || 0), 0);
      const monthComplete = monthMeditations.filter(m => (m.duration || 0) >= 3600).length;
      const monthPartial = monthMeditations.filter(m => (m.duration || 0) < 3600).length;

      const lang = user.lang || 'es';
      const formattedWeekDuration = formatExactDurationForEmail(weekDuration, lang);
      const formattedMonthDuration = formatExactDurationForEmail(monthDuration, lang);

      const monthNamesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const monthName = (lang === 'es' ? monthNamesEs : monthNamesEn)[today.getMonth()];

      const subject = lang === 'es' ? '📊 Tu reporte de meditación' : '📊 Your meditation report';

      if (!config.EMAIL_USER || !config.EMAIL_PASS) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`📧 [MODO DESARROLLO - Envío de Reporte a: ${user.email}]`);
        console.log(`   Semanales: ${weekMeditations.length} sesiones, tiempo: ${formattedWeekDuration}`);
        console.log(`   Mensuales: ${monthMeditations.length} sesiones, tiempo: ${formattedMonthDuration}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        if (callback) callback(null);
        return;
      }

      const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background: #0f0f1b; color: #e2e8f0; border-radius: 16px; border: 1px solid #2d2d5e; padding: 40px; box-sizing: border-box;">
          <a href="http://localhost:3000" style="text-decoration: none; display: block; text-align: center; margin-bottom: 32px;">
            <span style="font-size: 40px;">🧘</span>
            <h2 style="color: #c4b5fd; margin: 12px 0 4px; font-weight: 700; letter-spacing: 0.5px; text-decoration: none;">${lang === 'es' ? 'Meditación App' : 'Meditation App'}</h2>
            <p style="color: #94a3b8; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1.5px; text-decoration: none;">${lang === 'es' ? 'Reporte de Rendimiento' : 'Performance Report'}</p>
          </a>
          
          <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin-bottom: 24px;">
            ${lang === 'es' ? `Hola, <strong>${user.full_name}</strong>. ¡Felicitaciones por dedicarle tiempo a la meditación! Aquí están tus estadísticas:` : `Hello, <strong>${user.full_name}</strong>. Congratulations on dedicating time to meditation! Here are your statistics:`}
          </p>

          <div style="background: #1e1b4b; border-radius: 12px; border: 1px solid #312e81; padding: 24px; margin-bottom: 24px;">
            <h3 style="color: #a78bfa; margin-top: 0; margin-bottom: 16px; font-size: 18px; border-bottom: 1px solid #4338ca; padding-bottom: 8px;">📈 ${lang === 'es' ? 'Esta Semana' : 'This Week'}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; font-size: 15px;">⏱️ ${lang === 'es' ? 'Tiempo Meditado' : 'Time Meditated'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; font-weight: bold; font-size: 15px;">${formattedWeekDuration}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; font-size: 15px;">🧘 ${lang === 'es' ? 'Sesiones Totales' : 'Total Sessions'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; font-weight: bold; font-size: 15px;">${weekMeditations.length}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; padding-left: 20px; color: #64748b; font-size: 14px;">• ${lang === 'es' ? 'Completas (1h)' : 'Complete (1h)'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #cbd5e1; font-size: 14px;">${weekComplete}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; padding-left: 20px; color: #64748b; font-size: 14px;">• ${lang === 'es' ? 'Parciales' : 'Partial'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #cbd5e1; font-size: 14px;">${weekPartial}</td>
              </tr>
            </table>
          </div>

          <div style="background: #0f172a; border-radius: 12px; border: 1px solid #1e293b; padding: 24px; margin-bottom: 32px;">
            <h3 style="color: #38bdf8; margin-top: 0; margin-bottom: 16px; font-size: 18px; border-bottom: 1px solid #334155; padding-bottom: 8px;">📅 ${lang === 'es' ? `Este Mes (${monthName})` : `This Month (${monthName})`}</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; font-size: 15px;">⏱️ ${lang === 'es' ? 'Tiempo Meditado' : 'Time Meditated'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; font-weight: bold; font-size: 15px;">${formattedMonthDuration}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; font-size: 15px;">🧘 ${lang === 'es' ? 'Sesiones Totales' : 'Total Sessions'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; font-weight: bold; font-size: 15px;">${monthMeditations.length}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; padding-left: 20px; color: #64748b; font-size: 14px;">• ${lang === 'es' ? 'Completas (1h)' : 'Complete (1h)'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #cbd5e1; font-size: 14px;">${monthComplete}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; padding-left: 20px; color: #64748b; font-size: 14px;">• ${lang === 'es' ? 'Parciales' : 'Partial'}:</td>
                <td style="padding: 6px 0; text-align: right; color: #cbd5e1; font-size: 14px;">${monthPartial}</td>
              </tr>
            </table>
          </div>

          <p style="text-align: center; color: #a78bfa; font-size: 16px; font-style: italic; margin: 0 0 24px;">
            ${lang === 'es' ? '¡Seguí así! Cada minuto cuenta, sigue practicando. 🧘' : 'Keep it up! Every minute counts, keep practicing. 🧘'}
          </p>

          <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0 16px;">
          <p style="text-align: center; color: #475569; font-size: 11px; margin: 0;">
            ${lang === 'es' ? 'Recibes este correo porque eres un usuario registrado de Meditación App.' : 'You receive this email because you are a registered user of Meditation App.'}
          </p>
        </div>
      `;

      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        console.log(`[Email] Enviando reporte a ${user.email} vía Resend HTTP API...`);
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Meditacion App <onboarding@resend.dev>',
            to: user.email,
            subject: subject,
            html: htmlContent
          })
        }).then(async (response) => {
          if (response.ok) {
            if (callback) callback(null);
          } else {
            const errData = await response.json();
            console.error('[Resend Report Error] API response not OK:', errData);
            if (callback) callback(new Error(JSON.stringify(errData)));
          }
        }).catch((err) => {
          console.error('[Resend Report Error] Fetch failed:', err);
          if (callback) callback(err);
        });
        return;
      }

      const dynamicTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.EMAIL_USER,
          pass: config.EMAIL_PASS,
        },
        connectionTimeout: 8000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
      });

      dynamicTransporter.sendMail({
        from: `"Meditación App" <${config.EMAIL_USER}>`,
        to: user.email,
        subject: subject,
        html: htmlContent
      }, (mailErr) => {
        if (callback) callback(mailErr);
      });
    }
  );
}

// POST /api/meditations/send-stats → Envía manualmente el reporte de estadísticas al mail del usuario logueado
app.post('/api/meditations/send-stats', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const reqLang = req.body.lang || 'es';
  db.get('SELECT id, email, full_name FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      console.error('[Manual Stats Route] Error fetching user:', err);
      return res.status(500).json({ error: 'Error interno al buscar el usuario' });
    }
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.lang = reqLang;

    sendReportToUser(user, (reportErr) => {
      if (reportErr) {
        console.error('[Manual Stats Email Error] Detailed error:', reportErr);
        return res.status(500).json({ error: 'Error al enviar el correo electrónico de estadísticas' });
      }
      res.json({ success: true, message: 'Estadísticas enviadas por correo con éxito' });
    });
  });
});

async function sendWeeklyReports() {
  db.all('SELECT id, email, full_name FROM users', [], (err, users) => {
    if (err) {
      console.error('[Weekly Reports] Error select users:', err);
      return;
    }
    if (!users || users.length === 0) return;

    users.forEach((user) => {
      user.lang = 'es'; // default a español para reportes automáticos locales
      sendReportToUser(user);
    });
  });
}

// Iniciar el interval scheduler de los viernes
let lastSentWeeklyDateKey = '';
setInterval(async () => {
  const now = new Date();
  const day = now.getDay(); // 5 = Viernes
  const hour = now.getHours(); // 18
  const dateKey = now.toISOString().slice(0, 10);

  if (day === 5 && hour === 18 && lastSentWeeklyDateKey !== dateKey) {
    lastSentWeeklyDateKey = dateKey;
    console.log(`[Scheduler] Iniciando envío de estadísticas semanales del viernes: ${dateKey}`);
    try {
      await sendWeeklyReports();
    } catch (err) {
      console.error('[Scheduler] Error al enviar reportes semanales:', err);
    }
  }
}, 60000); // revisar cada minuto

// ──────────────────────────────────────────────
// Arrancar servidor
// ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🧘 Meditación App - Servidor corriendo`);
  console.log(`🌐 Abre en tu navegador: http://localhost:${PORT}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

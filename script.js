/* ════════════════════════════════════════════════
   MEDITACIÓN APP — script.js
   ════════════════════════════════════════════════ */

// ──────────────────────────────────────────────
// TRADUCCIONES
// ──────────────────────────────────────────────
const translations = {
  es: {
    title: "Sesión de Meditación",
    subtitle: "Sesión de meditación de 1 Hora",
    description:
      'Esta aplicación está diseñada para meditar durante 1 hora. Todas las sesiones incluyen un gong al inicio (minuto 0) y otro al final (minuto 60). Puedes configurar señales intermedias para mantener la atención, con un gong más grave. Además, puedes activar un doble "tick" en el minuto 50 para practicar Metta durante los últimos 10 minutos.',
    soundConfig: "Configuración de Sonidos",
    soundAHelp: "El Gong Principal se reproducirá al inicio (min 0) y al final (min 60).",
    soundBLabel: "Señales Intermedias (Gong grave):",
    opt3: "3 señales (cada 15 min)",
    opt2: "2 señales (cada 20 min)",
    opt1: "1 señal (a la media hora)",
    opt0: "Sin señales",
    optRandom: "Aleatorio 🎲 (entre 3 y 5 señales en momentos random)",
    soundCLabel: 'Habilitar doble "tick" (minuto 50) para practicar Metta',
    previewTitle: "Previsualizar Sonidos",
    btnSoundA: "🎵 Gong Principal (Inicio/Fin)",
    btnSoundB: "🎵 Gong Grave (Señal)",
    btnSoundC: "🎵 Doble Tick (Metta)",
    btnStart: "Comenzar Sesión",
    btnPause: "Pausar",
    btnResume: "Reanudar",
    btnStop: "Detener Sesión",
    statusReady: "Lista para comenzar. La pantalla se mantendrá encendida durante la sesión.",
    statusRunning: "Sesión en curso.",
    statusPaused: "Sesión en pausa.",
    statusStopped: "Sesión detenida. Lista para comenzar.",
    statusFinished: "Sesión finalizada. ¡Buen trabajo!",
    langToggle: "Switch to English",
    btnLogin: "Log In",
    btnSignup: "Sign In",
    btnStats: "Ver estadísticas",
    btnLogout: "Cerrar sesión",
    btnDeleteAccount: "Eliminar cuenta",
    modalLoginTitle: "Iniciar Sesión",
    modalSignupTitle: "Crear Cuenta",
    modalVerifyTitle: "Verificá tu correo",
    modalDoneTitle: "Guardar meditación",
    modalDoneSubtitle: "¿Querés guardar esta meditación?",
    modalDeleteTitle: "¿Eliminar cuenta?",
    modalDeleteSubtitle: "Esta acción es permanente y eliminará todos tus datos y meditaciones.",
    modalStatsTitle: "Mis Estadísticas",
    labelEmail: "Correo electrónico",
    labelPassword: "Contraseña",
    labelNewPassword: "Contraseña nueva",
    labelFullName: "Nombre completo",
    btnLoginSubmit: "Iniciar Sesión",
    btnSignupSubmit: "Crear Cuenta y Recibir Código",
    btnVerifySubmit: "Verificar Código",
    btnResend: "Reenviar código",
    btnYes: "Sí, registrar",
    btnNo: "No",
    btnOk: "Aceptar",
    modalAlertTitle: "Mensaje",
    modalConfirmTitle: "Confirmación",
    btnConfirmYes: "Aceptar",
    btnConfirmNo: "Cancelar",
    modalEmailStatusTitle: "Estadísticas por correo",
    btnDeleteYes: "Sí, eliminar",
    btnDeleteNo: "No, cancelar",
    loginSwitchText: "¿No tenés cuenta?",
    switchToSignup: "Registrate aquí",
    signupSwitchText: "¿Ya tenés cuenta?",
    switchToLogin: "Iniciá sesión aquí",
    meditationSaved: "✅ ¡Meditación registrada!",
    statTotal: "Sesiones",
    statsEmpty: "Aún no tenés meditaciones registradas. ¡Empieza hoy! 🧘",
    ruleLength: "Mínimo 6 caracteres",
    ruleUpper: "Al menos una mayúscula",
    ruleNumber: "Al menos un número",
    ruleSymbol: "Al menos un símbolo (!, @, #…)",
    verifyEmailHint: "Te enviamos un código de 4 dígitos a",
    countdownLabel: "⏳ El código expira en",
    statsLoading: "Cargando...",
    placeholderFullName: "Alejandra García",
    hello: "Hola",
    statHours: "Tiempo Total",
    statStreak: "Racha (Días)",
    weeklyTrackerTitle: "Rendimiento esta semana",
    historyTitle: "Historial de Meditaciones",
    btnSendEmailStats: "Enviar estadísticas por mail",
    btnChangePassword: "Cambiar contraseña",
    btnAdminSettings: "Configuración",
    modalAdminSettingsTitle: "Configuración de Administrador",
    labelAdminEmailUser: "Correo emisor",
    labelAdminEmailPass: "Contraseña de aplicación",
    btnAdminSettingsSubmit: "Guardar Configuración",
    modalChangePasswordTitle: "Cambiar Contraseña",
    labelCurrentPassword: "Contraseña actual",
    labelNewPasswordChange: "Contraseña nueva",
    labelConfirmPassword: "Confirmar contraseña nueva",
    btnChangePasswordSubmit: "Actualizar Contraseña",
    successPasswordChanged: "✅ Contraseña actualizada correctamente",
    successEmailSent: "✉️ ¡Estadísticas enviadas por correo con éxito!",
    errorEmailSent: "❌ Hubo un problema al enviar el correo. Intenta de nuevo.",
    errorPasswordsDoNotMatch: "Las contraseñas nuevas no coinciden.",
    statComplete: "Completas (1h)",
    statPartial: "Parciales",
    periodTitle: "Resumen Temporal",
    periodWeek: "Esta Semana",
    navHome: "Inicio",
    navStats: "Estadísticas",
    btnViewList: "📋 Historial",
    btnViewHeatmap: "📅 Mensual",
    btnViewYearly: "📈 Anual",
    yearlyTitle: "Rendimiento Anual (Horas)",
    heatmapTitle: "Actividad Mensual",
    filterComplete: "Completas (1h)",
    filterPartial: "Parciales",
    periodMonth: "Este Mes",
    periodYear: "Este Año",
    periodStatFormat: (count, time) => `${count} ${count === 1 ? 'sesión' : 'sesiones'} (${time})`,
    errorAllFieldsRequired: "Por favor completá todos los campos.",
    errorPasswordRules: "La contraseña no cumple con todos los requisitos.",
    errorConnection: "Error de conexión. Verificá que el servidor esté corriendo.",
    errorConnectionShort: "Error de conexión.",
    errorVerifyDigits: "Ingresá los 4 dígitos del código.",
    errorVerifyExpired: "Código incorrecto o expirado",
    errorStatsLoad: "Error al cargar las estadísticas.",
    statusSigningIn: "Iniciando sesión...",
    statusSendingCode: "Enviando código...",
    statusVerifying: "Verificando...",
    statusResending: "Enviando...",
    statusSaving: "Guardando...",
    statusDeleting: "Eliminando...",
    statusExpired: "EXPIRADO",
  },
  en: {
    title: "Meditation Session",
    subtitle: "1 Hour Meditation Session",
    description:
      'This application is designed for 1-hour meditation sessions. All sessions include a gong at the beginning (minute 0) and another at the end (minute 60). You can configure intermediate signals to help maintain focus. Additionally, you can enable a double "tick" at minute 50 to practice Metta during the last 10 minutes.',
    soundConfig: "Sound Configuration",
    soundAHelp: "The Main Gong will play at the start (min 0) and end (min 60).",
    soundBLabel: "Intermediate Signals (Lower gong):",
    opt3: "3 signals (every 15 min)",
    opt2: "2 signals (every 20 min)",
    opt1: "1 signal (at half hour)",
    opt0: "No signals",
    optRandom: "Random 🎲 (between 3 and 5 signals at random times)",
    soundCLabel: 'Enable double "tick" (minute 50) to practice Metta',
    previewTitle: "Preview Sounds",
    btnSoundA: "🎵 Main Gong (Start/End)",
    btnSoundB: "🎵 Lower Gong (Signal)",
    btnSoundC: "🎵 Double Tick (Metta)",
    btnStart: "Start Session",
    btnPause: "Pause",
    btnResume: "Resume",
    btnStop: "Stop Session",
    statusReady: "Ready to start. The screen will stay awake during the session.",
    statusRunning: "Session in progress.",
    statusPaused: "Session paused.",
    statusStopped: "Session stopped. Ready to start.",
    statusFinished: "Session finished. Great job!",
    langToggle: "Cambiar a Español",
    btnLogin: "Log In",
    btnSignup: "Sign Up",
    btnStats: "View statistics",
    btnLogout: "Log out",
    btnDeleteAccount: "Delete account",
    modalLoginTitle: "Log In",
    modalSignupTitle: "Create Account",
    modalVerifyTitle: "Verify your email",
    modalDoneTitle: "Record meditation",
    modalDoneSubtitle: "Do you want to save this meditation?",
    modalDeleteTitle: "Delete account?",
    modalDeleteSubtitle: "This action is permanent and will delete all your data and meditations.",
    modalStatsTitle: "My Statistics",
    labelEmail: "Email address",
    labelPassword: "Password",
    labelNewPassword: "New password",
    labelFullName: "Full name",
    btnLoginSubmit: "Log In",
    btnSignupSubmit: "Create Account & Get Code",
    btnVerifySubmit: "Verify Code",
    btnResend: "Resend code",
    btnYes: "Yes, save it",
    btnNo: "No",
    btnOk: "OK",
    modalAlertTitle: "Message",
    modalConfirmTitle: "Confirmation",
    btnConfirmYes: "Accept",
    btnConfirmNo: "Cancel",
    modalEmailStatusTitle: "Stats via Email",
    btnDeleteYes: "Yes, delete",
    btnDeleteNo: "No, cancel",
    loginSwitchText: "Don't have an account?",
    switchToSignup: "Register here",
    signupSwitchText: "Already have an account?",
    switchToLogin: "Log in here",
    meditationSaved: "✅ Meditation recorded!",
    statTotal: "Sessions",
    statsEmpty: "You have no meditations recorded yet. Start today! 🧘",
    ruleLength: "At least 6 characters",
    ruleUpper: "At least one uppercase letter",
    ruleNumber: "At least one number",
    ruleSymbol: "At least one symbol (!, @, #…)",
    verifyEmailHint: "We sent a 4-digit code to",
    countdownLabel: "⏳ Code expires in",
    statsLoading: "Loading...",
    placeholderFullName: "Alexandra Garcia",
    hello: "Hello",
    statHours: "Total Time",
    statStreak: "Streak (Days)",
    weeklyTrackerTitle: "Weekly Performance",
    historyTitle: "Meditation History",
    btnSendEmailStats: "Send stats via email",
    btnChangePassword: "Change password",
    btnAdminSettings: "Settings",
    modalAdminSettingsTitle: "Admin Settings",
    labelAdminEmailUser: "Sender Email",
    labelAdminEmailPass: "App Password",
    btnAdminSettingsSubmit: "Save Settings",
    modalChangePasswordTitle: "Change Password",
    labelCurrentPassword: "Current password",
    labelNewPasswordChange: "New password",
    labelConfirmPassword: "Confirm new password",
    btnChangePasswordSubmit: "Update Password",
    successPasswordChanged: "✅ Password updated successfully",
    successEmailSent: "✉️ Statistics successfully sent via email!",
    errorEmailSent: "❌ There was a problem sending the email. Please try again.",
    errorPasswordsDoNotMatch: "The new passwords do not match.",
    statComplete: "Complete (1h)",
    statPartial: "Partial",
    periodTitle: "Temporal Summary",
    periodWeek: "This Week",
    navHome: "Home",
    navStats: "Statistics",
    btnViewList: "📋 History",
    btnViewHeatmap: "📅 Monthly",
    btnViewYearly: "📈 Yearly",
    yearlyTitle: "Yearly Performance (Hours)",
    heatmapTitle: "Monthly Activity",
    filterComplete: "Complete (1h)",
    filterPartial: "Partial",
    periodMonth: "This Month",
    periodYear: "This Year",
    periodStatFormat: (count, time) => `${count} ${count === 1 ? 'session' : 'sessions'} (${time})`,
    errorAllFieldsRequired: "Please fill in all fields.",
    errorPasswordRules: "The password does not meet all requirements.",
    errorConnection: "Connection error. Make sure the server is running.",
    errorConnectionShort: "Connection error.",
    errorVerifyDigits: "Please enter the 4 digits of the code.",
    errorVerifyExpired: "Incorrect or expired code",
    errorStatsLoad: "Error loading statistics.",
    statusSigningIn: "Signing in...",
    statusSendingCode: "Sending code...",
    statusVerifying: "Verifying...",
    statusResending: "Sending...",
    statusSaving: "Saving...",
    statusDeleting: "Deleting...",
    statusExpired: "EXPIRED",
  },
};

let currentLang = "es";

// ──────────────────────────────────────────────
// ESTADO DE SESIÓN DE USUARIO
// ──────────────────────────────────────────────
let currentUser = null; // { id, full_name, email }
let pendingSignupEmail = null; // guarda el email durante la verificación
let countdownInterval = null;
let countdownSeconds = 300; // 5 minutos

// ──────────────────────────────────────────────
// CONFIGURACIÓN TIMER
// ──────────────────────────────────────────────
const TOTAL_MINUTES = 60;
const TOTAL_SECONDS = TOTAL_MINUTES * 60;

// ──────────────────────────────────────────────
// ELEMENTOS DEL DOM
// ──────────────────────────────────────────────
const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const pauseBtn = document.getElementById("pause-btn");
const soundBSelect = document.getElementById("sound-b-select");
const soundCCheck = document.getElementById("sound-c-check");
const statusMsg = document.getElementById("status-msg");
const langToggleBtn = document.getElementById("lang-toggle");

// Auth bar
const authButtons = document.getElementById("auth-buttons");
const userMenu = document.getElementById("user-menu");
const userGreeting = document.getElementById("user-greeting");
const userMenuBtn = document.getElementById("user-menu-btn");
const userDropdown = document.getElementById("user-dropdown");

// Botones de auth
const btnLogin = document.getElementById("btn-login");
const btnSignup = document.getElementById("btn-signup");
const btnLogout = document.getElementById("btn-logout");
const btnDeleteAccount = document.getElementById("btn-delete-account");
const btnSendEmailStats = document.getElementById("btn-send-email-stats");
const btnChangePasswordTrigger = document.getElementById("btn-change-password-trigger");
const navToggleStats = document.getElementById("nav-toggle-stats");

// Modales
const modalLogin = document.getElementById("modal-login");
const modalSignup = document.getElementById("modal-signup");
const modalVerify = document.getElementById("modal-verify");
const modalMeditationDone = document.getElementById("modal-meditation-done");
const modalDeleteAccount = document.getElementById("modal-delete-account");
const modalDeleteSession = document.getElementById("modal-delete-session");
const modalChangePassword = document.getElementById("modal-change-password");
const modalEmailStatus = document.getElementById("modal-email-status");
const modalAdminSettings = document.getElementById("modal-admin-settings");
const modalCustomAlert = document.getElementById("modal-custom-alert");
const modalCustomConfirm = document.getElementById("modal-custom-confirm");
const customAlertMessage = document.getElementById("custom-alert-message");
const customConfirmMessage = document.getElementById("custom-confirm-message");

// Elementos admin settings
const btnAdminSettingsTrigger = document.getElementById("btn-admin-settings-trigger");
const dividerAdminSettings = document.getElementById("divider-admin-settings");
const formAdminSettings = document.getElementById("form-admin-settings");
const adminEmailUser = document.getElementById("admin-email-user");
const adminEmailPass = document.getElementById("admin-email-pass");
const adminSettingsError = document.getElementById("admin-settings-error");
const adminSettingsSuccess = document.getElementById("admin-settings-success");

// Secciones (Vistas SPA)
const sectionHome = document.getElementById("section-home");
const sectionStats = document.getElementById("section-stats");
const homeHeader = document.querySelector("#section-home header");
const controlsCard = document.querySelector(".controls-card");
const previewCard = document.querySelector(".preview-card");

// Audios
const soundA = document.getElementById("soundA");
const soundB = document.getElementById("soundB");
const soundC = document.getElementById("soundC");

// ──────────────────────────────────────────────
// ESTADO TIMER
// ──────────────────────────────────────────────
let timerInterval = null;
let currentSeconds = TOTAL_SECONDS;
let isRunning = false;
let isPaused = false;
let wakeLock = null;
let randomSignalMinutes = [];
let lastSessionDuration = 0;
let meditationIdToDelete = null;
let activeStatsView = "list";
let currentMeditations = [];
let currentCalMonth = new Date().getMonth();
let currentCalYear = new Date().getFullYear();
let currentYearlyChartYear = new Date().getFullYear();

// ════════════════════════════════════════════════
// IDIOMA
// ════════════════════════════════════════════════
function updateLanguage() {
  const t = translations[currentLang];

  // Traducir todos los elementos con data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Traducir reglas de contraseña (preservando el prefijo ✗ o ✓)
  document.querySelectorAll("[data-i18n-rule]").forEach((el) => {
    const key = el.getAttribute("data-i18n-rule");
    if (t[key] !== undefined) {
      const prefix = el.classList.contains("valid") ? "✓ " : "✗ ";
      el.textContent = prefix + t[key];
    }
  });

  // Traducir placeholders de inputs
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  if (currentUser) {
    const firstName = currentUser.full_name.split(" ")[0];
    const adminLabel = currentUser.is_admin === 1 ? " (admin)" : "";
    userGreeting.textContent = `${t.hello} ${firstName}${adminLabel}`;
    updateNavToggleText();
  }

  // Si hay estadísticas en memoria, re-renderizar todo en caliente en el nuevo idioma
  if (currentMeditations && currentMeditations.length > 0) {
    renderWeeklyTracker(currentMeditations);
    renderYearlyBarChart(currentMeditations);
    renderMonthlyHeatmap(currentMeditations);

    const periodWeekStats = document.getElementById("period-week-stats");
    const periodMonthStats = document.getElementById("period-month-stats");
    const periodYearStats = document.getElementById("period-year-stats");

    if (periodWeekStats && periodMonthStats && periodYearStats) {
      const today = new Date();
      const currentDayOfWeek = today.getDay();
      const daysOffset = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
      const monday = new Date(today);
      monday.setDate(today.getDate() - daysOffset);
      monday.setHours(0, 0, 0, 0);

      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      firstDayOfYear.setHours(0, 0, 0, 0);

      const weekSessions = currentMeditations.filter(m => new Date(m.completed_at) >= monday);
      const weekDuration = weekSessions.reduce((acc, m) => acc + (m.duration || 0), 0);

      const monthSessions = currentMeditations.filter(m => new Date(m.completed_at) >= firstDayOfMonth);
      const monthDuration = monthSessions.reduce((acc, m) => acc + (m.duration || 0), 0);

      const yearSessions = currentMeditations.filter(m => new Date(m.completed_at) >= firstDayOfYear);
      const yearDuration = yearSessions.reduce((acc, m) => acc + (m.duration || 0), 0);

      periodWeekStats.textContent = translations[currentLang].periodStatFormat(weekSessions.length, formatExactDuration(weekDuration));
      periodMonthStats.textContent = translations[currentLang].periodStatFormat(monthSessions.length, formatExactDuration(monthDuration));
      periodYearStats.textContent = translations[currentLang].periodStatFormat(yearSessions.length, formatExactDuration(yearDuration));
    }

    renderHistoryList(currentMeditations);
  }

  document.documentElement.lang = currentLang;

  if (isRunning && !isPaused) statusMsg.textContent = t.statusRunning;
  else if (isRunning && isPaused) {
    statusMsg.textContent = t.statusPaused;
    pauseBtn.textContent = t.btnResume;
  } else {
    statusMsg.textContent = currentSeconds === 0 ? t.statusFinished : t.statusReady;
  }
}

langToggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "es" ? "en" : "es";
  updateLanguage();
});

// ════════════════════════════════════════════════
// MODALES — HELPERS
// ════════════════════════════════════════════════
function openModal(modal) {
  modal.classList.remove("hidden");
  // Foco en el primer input
  const firstInput = modal.querySelector("input");
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeModal(modal) {
  modal.classList.add("hidden");
  if (modal === modalVerify) {
    clearInterval(countdownInterval);
  }
}

function closeAllModals() {
  [modalLogin, modalSignup, modalVerify, modalMeditationDone, modalDeleteAccount, modalDeleteSession, modalChangePassword, modalCustomAlert, modalCustomConfirm].forEach((m) => {
    if (m) closeModal(m);
  });
}

// Mostrar alerta personalizada
function showCustomAlert(title, message) {
  return new Promise((resolve) => {
    const titleEl = document.getElementById("custom-alert-title");
    if (titleEl) titleEl.textContent = title;
    if (customAlertMessage) customAlertMessage.textContent = message;

    const okBtn = document.getElementById("btn-custom-alert-ok");
    const closeBtn = document.getElementById("close-custom-alert");

    const onResolve = () => {
      closeModal(modalCustomAlert);
      okBtn?.removeEventListener("click", onResolve);
      closeBtn?.removeEventListener("click", onResolve);
      resolve();
    };

    okBtn?.addEventListener("click", onResolve);
    closeBtn?.addEventListener("click", onResolve);

    openModal(modalCustomAlert);
  });
}

// Mostrar confirmación personalizada
function showCustomConfirm(title, message) {
  return new Promise((resolve) => {
    const titleEl = document.getElementById("custom-confirm-title");
    if (titleEl) titleEl.textContent = title;
    if (customConfirmMessage) customConfirmMessage.textContent = message;

    const yesBtn = document.getElementById("btn-custom-confirm-yes");
    const noBtn = document.getElementById("btn-custom-confirm-no");
    const closeBtn = document.getElementById("close-custom-confirm");

    const onYes = () => {
      cleanup();
      resolve(true);
    };

    const onNo = () => {
      cleanup();
      resolve(false);
    };

    const cleanup = () => {
      closeModal(modalCustomConfirm);
      yesBtn?.removeEventListener("click", onYes);
      noBtn?.removeEventListener("click", onNo);
      closeBtn?.removeEventListener("click", onNo);
    };

    yesBtn?.addEventListener("click", onYes);
    noBtn?.addEventListener("click", onNo);
    closeBtn?.addEventListener("click", onNo);

    openModal(modalCustomConfirm);
  });
}

// Cerrar modal al clickear el overlay (fuera del box)
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeAllModals();
  });
});

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllModals();
});

// Botones X de cerrar
document.getElementById("close-login")?.addEventListener("click", () => closeModal(modalLogin));
document.getElementById("close-signup")?.addEventListener("click", () => closeModal(modalSignup));
document.getElementById("close-change-password")?.addEventListener("click", () => closeModal(modalChangePassword));
document.getElementById("close-email-status")?.addEventListener("click", () => closeModal(modalEmailStatus));
document.getElementById("btn-email-status-ok")?.addEventListener("click", () => closeModal(modalEmailStatus));
document.getElementById("close-admin-settings")?.addEventListener("click", () => closeModal(modalAdminSettings));

// Abrir Cambiar Contraseña desde el menú de usuario
btnChangePasswordTrigger?.addEventListener("click", () => {
  userDropdown.classList.add("hidden");
  userMenuBtn.classList.remove("open");

  // Limpiar form
  const form = document.getElementById("form-change-password");
  form.reset();

  document.getElementById("change-pwd-error").classList.add("hidden");
  document.getElementById("change-pwd-success").classList.add("hidden");

  // Forzar tipo password y resetear iconos de ojo
  document.getElementById("change-pwd-current").type = "password";
  document.getElementById("change-pwd-new").type = "password";
  document.getElementById("change-pwd-confirm").type = "password";
  form.querySelectorAll(".toggle-password").forEach(btn => btn.textContent = "👁");

  // Reiniciar indicador de fortaleza
  document.getElementById("change-strength-fill").style.width = "0%";
  ["change-rule-length", "change-rule-upper", "change-rule-number", "change-rule-symbol"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove("valid");
      el.textContent = "✗ " + el.textContent.replace(/^[✗✓]\s/, "");
    }
  });
  openModal(modalChangePassword);
});

// Funciones de administración de usuarios
async function loadAndRenderAdminUsers() {
  const tbody = document.getElementById("admin-users-tbody");
  if (!tbody) return;

  tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">Cargando usuarios...</td></tr>`;

  try {
    const res = await fetch("/api/admin/users", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();
    tbody.innerHTML = "";

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No hay usuarios registrados</td></tr>`;
      return;
    }

    users.forEach((u) => {
      const tr = document.createElement("tr");

      // Si es el usuario logueado, deshabilitar el botón delete
      const isSelf = currentUser && currentUser.id === u.id;

      tr.innerHTML = `
        <td>
          <input type="text" value="${u.full_name}" id="admin-user-name-${u.id}" />
        </td>
        <td>
          <input type="email" value="${u.email}" id="admin-user-email-${u.id}" />
        </td>
        <td>
          <select id="admin-user-role-${u.id}">
            <option value="0" ${u.is_admin === 0 ? "selected" : ""}>Usuario</option>
            <option value="1" ${u.is_admin === 1 ? "selected" : ""}>Admin</option>
          </select>
        </td>
        <td class="admin-users-actions">
          <button class="btn-admin-action btn-save" title="Guardar cambios" onclick="saveAdminUser(${u.id})">💾</button>
          <button class="btn-admin-action btn-delete" title="Eliminar usuario" ${isSelf ? "disabled" : ""} onclick="deleteAdminUser(${u.id})">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error al cargar la lista de usuarios:", err);
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--error);">Error al cargar usuarios</td></tr>`;
  }
}

window.saveAdminUser = async function (userId) {
  const nameInput = document.getElementById(`admin-user-name-${userId}`);
  const emailInput = document.getElementById(`admin-user-email-${userId}`);
  const roleSelect = document.getElementById(`admin-user-role-${userId}`);

  if (!nameInput || !emailInput || !roleSelect) return;

  const full_name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const is_admin = parseInt(roleSelect.value);

  if (!full_name || !email) {
    await showCustomAlert(
      translations[currentLang].modalAlertTitle,
      currentLang === "es" ? "Por favor completa todos los campos del usuario." : "Please fill in all user fields."
    );
    return;
  }

  try {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ full_name, email, is_admin }),
      credentials: "include",
    });

    if (res.ok) {
      await showCustomAlert(
        translations[currentLang].modalAlertTitle,
        currentLang === "es" ? "Usuario actualizado correctamente" : "User updated successfully"
      );
      // Si el admin se editó a sí mismo, actualizar estado local
      if (currentUser && currentUser.id === userId) {
        currentUser.full_name = full_name;
        currentUser.email = email;
        currentUser.is_admin = is_admin;
        setLoggedIn(currentUser);
      }
      loadAndRenderAdminUsers();
    } else {
      const errData = await res.json();
      await showCustomAlert(
        translations[currentLang].modalAlertTitle,
        errData.error || "Error al actualizar el usuario"
      );
    }
  } catch (err) {
    console.error("Error al guardar cambios de usuario:", err);
    await showCustomAlert(
      translations[currentLang].modalAlertTitle,
      currentLang === "es" ? "Error de red" : "Network error"
    );
  }
};

window.deleteAdminUser = async function (userId) {
  const confirmMsg = currentLang === "es"
    ? "¿Estás seguro de que quieres eliminar a este usuario y todos sus registros de meditación?"
    : "Are you sure you want to delete this user and all their meditation records?";

  const hasConfirmed = await showCustomConfirm(
    translations[currentLang].modalConfirmTitle,
    confirmMsg
  );
  if (!hasConfirmed) return;

  try {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      await showCustomAlert(
        translations[currentLang].modalAlertTitle,
        currentLang === "es" ? "Usuario eliminado con éxito" : "User deleted successfully"
      );
      loadAndRenderAdminUsers();
    } else {
      const errData = await res.json();
      await showCustomAlert(
        translations[currentLang].modalAlertTitle,
        errData.error || "Error al eliminar el usuario"
      );
    }
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    await showCustomAlert(
      translations[currentLang].modalAlertTitle,
      currentLang === "es" ? "Error de red" : "Network error"
    );
  }
};

// Abrir Configuración de Administrador
btnAdminSettingsTrigger?.addEventListener("click", async () => {
  userDropdown.classList.add("hidden");
  userMenuBtn.classList.remove("open");

  adminSettingsError.classList.add("hidden");
  adminSettingsSuccess.classList.add("hidden");
  adminEmailUser.value = "";
  adminEmailPass.value = "";

  // Cargar lista de usuarios
  loadAndRenderAdminUsers();

  try {
    const res = await fetch("/api/admin/settings", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      adminEmailUser.value = data.EMAIL_USER || "";
      adminEmailPass.value = data.EMAIL_PASS || "";
    } else {
      const errData = await res.json();
      adminSettingsError.textContent = errData.error || "Error al cargar la configuración";
      adminSettingsError.classList.remove("hidden");
    }
  } catch (err) {
    adminSettingsError.textContent = "Error de red al conectar con el servidor";
    adminSettingsError.classList.remove("hidden");
  }

  // Asegurar tipo password y resetear ojo
  adminEmailPass.type = "password";
  modalAdminSettings.querySelectorAll(".toggle-password").forEach(btn => btn.textContent = "👁");

  openModal(modalAdminSettings);
});

// Guardar Configuración de Administrador
formAdminSettings?.addEventListener("submit", async (e) => {
  e.preventDefault();

  adminSettingsError.classList.add("hidden");
  adminSettingsSuccess.classList.add("hidden");

  const submitBtn = document.getElementById("btn-admin-settings-submit");
  const origText = submitBtn.textContent;

  const EMAIL_USER = adminEmailUser.value.trim();
  const EMAIL_PASS = adminEmailPass.value;

  if (!EMAIL_USER || !EMAIL_PASS) {
    adminSettingsError.textContent = currentLang === "es" ? "Todos los campos son requeridos" : "All fields are required";
    adminSettingsError.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = currentLang === "es" ? "Guardando..." : "Saving...";

  try {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ EMAIL_USER, EMAIL_PASS }),
      credentials: "include",
    });

    if (res.ok) {
      adminSettingsSuccess.textContent = currentLang === "es" ? "✅ Configuración guardada correctamente" : "✅ Settings saved successfully";
      adminSettingsSuccess.classList.remove("hidden");
      setTimeout(() => {
        closeModal(modalAdminSettings);
      }, 1500);
    } else {
      const errData = await res.json();
      adminSettingsError.textContent = errData.error || "Error al guardar la configuración";
      adminSettingsError.classList.remove("hidden");
    }
  } catch (err) {
    adminSettingsError.textContent = "Error de red al conectar con el servidor";
    adminSettingsError.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = origText;
  }
});

// Enviar estadísticas por mail de forma manual
btnSendEmailStats?.addEventListener("click", async () => {
  userDropdown.classList.add("hidden");
  userMenuBtn.classList.remove("open");

  // Mostrar feedback visual
  btnSendEmailStats.disabled = true;
  btnSendEmailStats.style.opacity = "0.5";
  btnSendEmailStats.style.cursor = "not-allowed";

  try {
    const res = await fetch("/api/meditations/send-stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: currentLang }),
    });

    if (res.ok) {
      document.getElementById("modal-email-status-icon").textContent = "✉️";
      document.getElementById("modal-email-status-message").textContent = translations[currentLang].successEmailSent;
      openModal(modalEmailStatus);
    } else {
      document.getElementById("modal-email-status-icon").textContent = "❌";
      document.getElementById("modal-email-status-message").textContent = translations[currentLang].errorEmailSent;
      openModal(modalEmailStatus);
    }
  } catch (err) {
    console.error("Error al enviar estadísticas manualmente:", err);
    document.getElementById("modal-email-status-icon").textContent = "❌";
    document.getElementById("modal-email-status-message").textContent = translations[currentLang].errorEmailSent;
    openModal(modalEmailStatus);
  } finally {
    btnSendEmailStats.disabled = false;
    btnSendEmailStats.style.opacity = "";
    btnSendEmailStats.style.cursor = "";
  }
});

// Switch entre login y signup
document.getElementById("switch-to-signup")?.addEventListener("click", () => {
  closeModal(modalLogin);
  openModal(modalSignup);
});
document.getElementById("switch-to-login")?.addEventListener("click", () => {
  closeModal(modalSignup);
  openModal(modalLogin);
});

// ════════════════════════════════════════════════
// TOGGLE PASSWORD VISIBILITY
// ════════════════════════════════════════════════
document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const input = document.getElementById(targetId);
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "🙈";
    } else {
      input.type = "password";
      btn.textContent = "👁";
    }
  });
});

// ════════════════════════════════════════════════
// VALIDACIÓN DE CONTRASEÑA (en tiempo real)
// ════════════════════════════════════════════════
const signupPassword = document.getElementById("signup-password");
const strengthFill = document.getElementById("strength-fill");
const ruleLength = document.getElementById("rule-length");
const ruleUpper = document.getElementById("rule-upper");
const ruleNumber = document.getElementById("rule-number");
const ruleSymbol = document.getElementById("rule-symbol");

function validatePasswordRules(pwd) {
  return {
    length: pwd.length >= 6,
    upper: /[A-Z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    symbol: /[^A-Za-z0-9]/.test(pwd),
  };
}

function updateRule(el, valid) {
  if (valid) {
    el.classList.add("valid");
    el.textContent = "✓ " + el.textContent.replace(/^[✗✓]\s/, "");
  } else {
    el.classList.remove("valid");
    el.textContent = "✗ " + el.textContent.replace(/^[✗✓]\s/, "");
  }
}

signupPassword?.addEventListener("input", () => {
  const pwd = signupPassword.value;
  const rules = validatePasswordRules(pwd);
  const passed = Object.values(rules).filter(Boolean).length;

  updateRule(ruleLength, rules.length);
  updateRule(ruleUpper, rules.upper);
  updateRule(ruleNumber, rules.number);
  updateRule(ruleSymbol, rules.symbol);

  const colors = ["", "#ef4444", "#f59e0b", "#f59e0b", "#10b981"];
  const widths = ["0%", "25%", "50%", "75%", "100%"];
  strengthFill.style.width = widths[passed];
  strengthFill.style.background = colors[passed] || "";
});

const changePwdNew = document.getElementById("change-pwd-new");
const changeStrengthFill = document.getElementById("change-strength-fill");
const changeRuleLength = document.getElementById("change-rule-length");
const changeRuleUpper = document.getElementById("change-rule-upper");
const changeRuleNumber = document.getElementById("change-rule-number");
const changeRuleSymbol = document.getElementById("change-rule-symbol");

changePwdNew?.addEventListener("input", () => {
  const pwd = changePwdNew.value;
  const rules = validatePasswordRules(pwd);
  const passed = Object.values(rules).filter(Boolean).length;

  updateRule(changeRuleLength, rules.length);
  updateRule(changeRuleUpper, rules.upper);
  updateRule(changeRuleNumber, rules.number);
  updateRule(changeRuleSymbol, rules.symbol);

  const colors = ["", "#ef4444", "#f59e0b", "#f59e0b", "#10b981"];
  const widths = ["0%", "25%", "50%", "75%", "100%"];
  changeStrengthFill.style.width = widths[passed];
  changeStrengthFill.style.background = colors[passed] || "";
});

function isPasswordValid(pwd) {
  const r = validatePasswordRules(pwd);
  return r.length && r.upper && r.number && r.symbol;
}

// ════════════════════════════════════════════════
// DROPDOWN DE USUARIO
// ════════════════════════════════════════════════
userMenuBtn?.addEventListener("click", () => {
  const isOpen = !userDropdown.classList.contains("hidden");
  if (isOpen) {
    userDropdown.classList.add("hidden");
    userMenuBtn.classList.remove("open");
  } else {
    userDropdown.classList.remove("hidden");
    userMenuBtn.classList.add("open");
  }
});

// Cerrar dropdown al clickear fuera
document.addEventListener("click", (e) => {
  if (userMenu && !userMenu.contains(e.target)) {
    userDropdown?.classList.add("hidden");
    userMenuBtn?.classList.remove("open");
  }
});

// ════════════════════════════════════════════════
// ESTADO DE AUTENTICACIÓN — MOSTRAR/OCULTAR UI
// ════════════════════════════════════════════════
function setLoggedIn(user) {
  currentUser = user;
  authButtons.classList.add("hidden");
  userMenu.classList.remove("hidden");
  navToggleStats?.classList.remove("hidden");
  updateNavToggleText();
  const firstName = user.full_name.split(" ")[0];
  const adminLabel = user.is_admin === 1 ? " (admin)" : "";
  userGreeting.textContent = `${translations[currentLang].hello} ${firstName}${adminLabel}`;

  // Mostrar/ocultar configuración para administradores
  if (user.is_admin === 1) {
    btnAdminSettingsTrigger?.classList.remove("hidden");
    dividerAdminSettings?.classList.remove("hidden");
  } else {
    btnAdminSettingsTrigger?.classList.add("hidden");
    dividerAdminSettings?.classList.add("hidden");
  }
}

function setLoggedOut() {
  currentUser = null;
  authButtons.classList.remove("hidden");
  userMenu.classList.add("hidden");
  userDropdown.classList.add("hidden");
  userMenuBtn.classList.remove("open");
  navToggleStats?.classList.add("hidden");
  btnAdminSettingsTrigger?.classList.add("hidden");
  dividerAdminSettings?.classList.add("hidden");
  switchMainView("home"); // Forzar regreso al Inicio si estaba en estadísticas
}

// ════════════════════════════════════════════════
// VERIFICAR SESIÓN AL CARGAR LA PÁGINA
// ════════════════════════════════════════════════
async function checkSession() {
  try {
    const res = await fetch("/api/me", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setLoggedIn(data.user);
    }
  } catch {
    // No hay sesión activa
  }
}

// ════════════════════════════════════════════════
// FORM: LOG IN
// ════════════════════════════════════════════════
btnLogin?.addEventListener("click", () => openModal(modalLogin));

document.getElementById("form-login")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("login-error");
  const submitBtn = document.getElementById("btn-login-submit");
  errorEl.classList.add("hidden");

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  if (!email || !password) {
    errorEl.textContent = translations[currentLang].errorAllFieldsRequired;
    errorEl.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = translations[currentLang].statusSigningIn;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || (currentLang === "es" ? "Error al iniciar sesión" : "Error logging in");
      errorEl.classList.remove("hidden");
      return;
    }

    setLoggedIn(data.user);
    closeModal(modalLogin);
    document.getElementById("form-login").reset();
  } catch {
    errorEl.textContent = translations[currentLang].errorConnection;
    errorEl.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = translations[currentLang].btnLoginSubmit;
  }
});

// ════════════════════════════════════════════════
// FORM: SIGN UP (REGISTRO)
// ════════════════════════════════════════════════
btnSignup?.addEventListener("click", () => openModal(modalSignup));

document.getElementById("form-signup")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("signup-error");
  const submitBtn = document.getElementById("btn-signup-submit");
  errorEl.classList.add("hidden");

  const full_name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;

  if (!full_name || !email || !password) {
    errorEl.textContent = translations[currentLang].errorAllFieldsRequired;
    errorEl.classList.remove("hidden");
    return;
  }

  if (!isPasswordValid(password)) {
    errorEl.textContent = translations[currentLang].errorPasswordRules;
    errorEl.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = translations[currentLang].statusSendingCode;

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ full_name, email, password, lang: currentLang }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || (currentLang === "es" ? "Error al crear la cuenta" : "Error creating account");
      errorEl.classList.remove("hidden");
      return;
    }

    pendingSignupEmail = email;
    closeModal(modalSignup);
    openVerifyModal(email);
    document.getElementById("form-signup").reset();
  } catch {
    errorEl.textContent = translations[currentLang].errorConnection;
    errorEl.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = translations[currentLang].btnSignupSubmit;
  }
});

// ════════════════════════════════════════════════
// FORM: CHANGE PASSWORD (CAMBIO DE CONTRASEÑA)
// ════════════════════════════════════════════════
document.getElementById("form-change-password")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("change-pwd-error");
  const successEl = document.getElementById("change-pwd-success");
  const submitBtn = document.getElementById("btn-change-password-submit");

  errorEl.classList.add("hidden");
  successEl.classList.add("hidden");

  const currentPassword = document.getElementById("change-pwd-current").value;
  const newPassword = changePwdNew.value;
  const confirmPassword = document.getElementById("change-pwd-confirm").value;

  if (!currentPassword || !newPassword || !confirmPassword) {
    errorEl.textContent = translations[currentLang].errorAllFieldsRequired;
    errorEl.classList.remove("hidden");
    return;
  }

  if (!isPasswordValid(newPassword)) {
    errorEl.textContent = translations[currentLang].errorPasswordRules;
    errorEl.classList.remove("hidden");
    return;
  }

  if (newPassword !== confirmPassword) {
    errorEl.textContent = translations[currentLang].errorPasswordsDoNotMatch;
    errorEl.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  const originalText = submitBtn.textContent;
  submitBtn.textContent = currentLang === "es" ? "Actualizando..." : "Updating...";

  try {
    const res = await fetch("/api/account/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || (currentLang === "es" ? "Error al cambiar contraseña" : "Error changing password");
      errorEl.classList.remove("hidden");
      return;
    }

    successEl.textContent = translations[currentLang].successPasswordChanged;
    successEl.classList.remove("hidden");
    document.getElementById("form-change-password").reset();

    // Reset strength bar
    changeStrengthFill.style.width = "0%";
    ["change-rule-length", "change-rule-upper", "change-rule-number", "change-rule-symbol"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("valid");
        el.textContent = "✗ " + el.textContent.replace(/^[✗✓]\s/, "");
      }
    });

    // Close modal after delay
    setTimeout(() => {
      closeModal(modalChangePassword);
    }, 1500);

  } catch {
    errorEl.textContent = translations[currentLang].errorConnection;
    errorEl.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
});

// ════════════════════════════════════════════════
// MODAL DE VERIFICACIÓN DE CÓDIGO
// ════════════════════════════════════════════════
function openVerifyModal(email) {
  document.getElementById("verify-email-display").textContent = email;
  clearAllCodeDigits();
  document.getElementById("verify-error").classList.add("hidden");
  document.getElementById("meditation-saved-msg")?.classList.add("hidden");
  openModal(modalVerify);
  startCountdown(300); // 5 minutos
  setTimeout(() => document.getElementById("code-1")?.focus(), 150);
}

// Input de 4 dígitos con auto-avance y borrado inteligente
const codeDigits = document.querySelectorAll(".code-digit");
codeDigits.forEach((input, idx) => {
  input.addEventListener("input", (e) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val.slice(-1);

    if (val && idx < codeDigits.length - 1) {
      codeDigits[idx + 1].focus();
    }

    if (val) input.classList.add("filled");
    else input.classList.remove("filled");
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && idx > 0) {
      codeDigits[idx - 1].focus();
      codeDigits[idx - 1].value = "";
      codeDigits[idx - 1].classList.remove("filled");
    }
  });

  // Pegar código completo
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    pasted.split("").forEach((char, i) => {
      if (codeDigits[i]) {
        codeDigits[i].value = char;
        codeDigits[i].classList.add("filled");
      }
    });
    const lastFilled = Math.min(pasted.length, codeDigits.length - 1);
    codeDigits[lastFilled].focus();
  });
});

function getCodeValue() {
  return Array.from(codeDigits).map((d) => d.value).join("");
}

function clearAllCodeDigits() {
  codeDigits.forEach((d) => {
    d.value = "";
    d.classList.remove("filled", "error");
  });
}

function shakeCodeDigits() {
  codeDigits.forEach((d) => {
    d.classList.add("error");
    setTimeout(() => d.classList.remove("error"), 400);
  });
}

// Countdown de 5 minutos
function startCountdown(seconds) {
  clearInterval(countdownInterval);
  countdownSeconds = seconds;
  const countdownEl = document.getElementById("countdown-seconds");
  const resendBtn = document.getElementById("btn-resend");

  updateCountdownDisplay(countdownEl, countdownSeconds);

  countdownInterval = setInterval(() => {
    countdownSeconds--;
    updateCountdownDisplay(countdownEl, countdownSeconds);

    if (countdownSeconds <= 60) {
      countdownEl?.classList.add("expiring");
    }

    if (countdownSeconds <= 0) {
      clearInterval(countdownInterval);
      if (countdownEl) countdownEl.textContent = translations[currentLang].statusExpired;
      if (resendBtn) resendBtn.disabled = false;
    }
  }, 1000);
}

function updateCountdownDisplay(el, seconds) {
  if (!el) return;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  el.textContent = `${m}:${s.toString().padStart(2, "0")}`;
}

// Submit del código
document.getElementById("form-verify")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const errorEl = document.getElementById("verify-error");
  const submitBtn = document.getElementById("btn-verify-submit");
  errorEl.classList.add("hidden");

  const code = getCodeValue();
  if (code.length !== 4) {
    shakeCodeDigits();
    errorEl.textContent = translations[currentLang].errorVerifyDigits;
    errorEl.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = translations[currentLang].statusVerifying;

  try {
    const res = await fetch("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: pendingSignupEmail, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      shakeCodeDigits();
      errorEl.textContent = data.error || translations[currentLang].errorVerifyExpired;
      errorEl.classList.remove("hidden");
      return;
    }

    clearInterval(countdownInterval);
    setLoggedIn(data.user);
    closeModal(modalVerify);
    pendingSignupEmail = null;
  } catch {
    errorEl.textContent = translations[currentLang].errorConnection;
    errorEl.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = translations[currentLang].btnVerifySubmit;
  }
});

// Reenviar código
document.getElementById("btn-resend")?.addEventListener("click", async () => {
  const errorEl = document.getElementById("verify-error");
  const resendBtn = document.getElementById("btn-resend");
  errorEl.classList.add("hidden");

  resendBtn.disabled = true;
  resendBtn.textContent = translations[currentLang].statusResending;

  try {
    const res = await fetch("/api/resend-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: pendingSignupEmail, lang: currentLang }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || (currentLang === "es" ? "Error al reenviar el código" : "Error resending code");
      errorEl.classList.remove("hidden");
      return;
    }

    clearAllCodeDigits();
    document.getElementById("countdown-seconds")?.classList.remove("expiring");
    startCountdown(300);
    codeDigits[0]?.focus();
  } catch {
    errorEl.textContent = translations[currentLang].errorConnectionShort;
    errorEl.classList.remove("hidden");
  } finally {
    setTimeout(() => {
      resendBtn.textContent = translations[currentLang].btnResend;
    }, 1000);
  }
});

// ════════════════════════════════════════════════
// LOGOUT
// ════════════════════════════════════════════════
btnLogout?.addEventListener("click", async () => {
  try {
    await fetch("/api/logout", { method: "POST", credentials: "include" });
  } catch {/* ignorar */ }
  setLoggedOut();
  userDropdown.classList.add("hidden");
});

// ════════════════════════════════════════════════
// ELIMINAR CUENTA
// ════════════════════════════════════════════════
btnDeleteAccount?.addEventListener("click", () => {
  userDropdown.classList.add("hidden");
  const deleteErrorEl = document.getElementById("delete-error");
  if (deleteErrorEl) deleteErrorEl.classList.add("hidden");
  openModal(modalDeleteAccount);
});

document.getElementById("btn-delete-no")?.addEventListener("click", () => closeModal(modalDeleteAccount));

document.getElementById("btn-delete-yes")?.addEventListener("click", async () => {
  const deleteErrorEl = document.getElementById("delete-error");
  const deleteYesBtn = document.getElementById("btn-delete-yes");
  deleteErrorEl?.classList.add("hidden");
  deleteYesBtn.disabled = true;
  deleteYesBtn.textContent = translations[currentLang].statusDeleting;

  try {
    const res = await fetch("/api/account", {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      if (deleteErrorEl) {
        deleteErrorEl.textContent = data.error || (currentLang === "es" ? "Error al eliminar la cuenta" : "Error deleting account");
        deleteErrorEl.classList.remove("hidden");
      }
      return;
    }

    setLoggedOut();
    closeModal(modalDeleteAccount);
  } catch {
    if (deleteErrorEl) {
      deleteErrorEl.textContent = translations[currentLang].errorConnectionShort;
      deleteErrorEl.classList.remove("hidden");
    }
  } finally {
    deleteYesBtn.disabled = false;
    deleteYesBtn.textContent = translations[currentLang].btnDeleteYes;
  }
});

// Auxiliares para cálculo de estadísticas y racha
function getLocalDateStr(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

function calculateStreak(meditations) {
  if (!meditations || meditations.length === 0) return 0;

  // Fechas únicas locales ordenadas de la más reciente a la más antigua
  const uniqueDates = Array.from(new Set(meditations.map(m => getLocalDateStr(new Date(m.completed_at)))))
    .sort((a, b) => new Date(b) - new Date(a));

  const todayStr = getLocalDateStr(new Date());
  const yesterdayStr = getLocalDateStr(new Date(Date.now() - 24 * 60 * 60 * 1000));

  // Si no se meditó ni hoy ni ayer, la racha actual es 0
  if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 0;
  let currentDate = new Date(uniqueDates[0]);

  for (let i = 0; i < uniqueDates.length; i++) {
    const medDate = new Date(uniqueDates[i]);
    const diffTime = Math.abs(currentDate - medDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Si es el primer elemento o la diferencia es de 1 día (días consecutivos), continúa la racha
    if (i === 0 || diffDays === 1) {
      streak++;
      currentDate = medDate;
    } else if (diffDays === 0) {
      // Mismo día (ya filtrado por Set, pero por seguridad)
      continue;
    } else {
      break;
    }
  }

  return streak;
}

function renderWeeklyTracker(meditations) {
  const container = document.getElementById("weekly-days-container");
  if (!container) return;
  container.innerHTML = "";

  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0: Domingo, 1: Lunes...

  // Lunes de la semana actual
  const daysOffset = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysOffset);

  const dayNamesEs = ["L", "M", "M", "J", "V", "S", "D"];
  const dayNamesEn = ["M", "T", "W", "T", "F", "S", "S"];
  const dayNames = currentLang === "es" ? dayNamesEs : dayNamesEn;

  // Fechas en las que se meditó
  const medDates = new Set(meditations.map(m => getLocalDateStr(new Date(m.completed_at))));

  for (let i = 0; i < 7; i++) {
    const loopDate = new Date(monday);
    loopDate.setDate(monday.getDate() + i);
    const loopDateStr = getLocalDateStr(loopDate);

    const isCompleted = medDates.has(loopDateStr);
    const isToday = loopDateStr === getLocalDateStr(today);

    const dayDiv = document.createElement("div");
    dayDiv.className = "day-circle";

    const dot = document.createElement("div");
    dot.className = "day-dot";
    if (isCompleted) dot.classList.add("completed");
    if (isToday) dot.classList.add("today");
    dot.textContent = isCompleted ? "✓" : loopDate.getDate();

    const label = document.createElement("span");
    label.className = "day-label";
    label.textContent = dayNames[i];

    dayDiv.appendChild(dot);
    dayDiv.appendChild(label);
    container.appendChild(dayDiv);
  }
}

// Función para dar formato legible a la duración
function formatDuration(seconds) {
  if (seconds < 60) {
    return currentLang === "es" ? `${seconds} seg` : `${seconds} sec`;
  }
  const mins = Math.floor(seconds / 60);
  if (mins < 60) {
    return `${mins} min`;
  }
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  if (remainingMins > 0) {
    return `${hrs}h ${remainingMins}m`;
  }
  return `${hrs}h`;
}

// Función para dar formato exacto incluyendo segundos
function formatExactDuration(seconds) {
  if (seconds <= 0) return `0s`;
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  let parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(" ");
}

// Gráfico de Barras Anual
function renderYearlyBarChart(meditations) {
  const container = document.getElementById("yearly-bar-chart-container");
  if (!container) return;
  container.innerHTML = "";

  const labelEl = document.getElementById("calendar-year-label");
  if (labelEl) {
    labelEl.textContent = currentYearlyChartYear;
  }

  const filterComplete = document.getElementById("yearly-filter-complete")?.checked ?? true;
  const filterPartial = document.getElementById("yearly-filter-partial")?.checked ?? false;

  const monthsEs = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const months = currentLang === "es" ? monthsEs : monthsEn;

  const fullMonthNamesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fullMonthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const fullMonthNames = currentLang === "es" ? fullMonthNamesEs : fullMonthNamesEn;

  const monthlySeconds = Array(12).fill(0);
  const monthlyCounts = Array(12).fill(0);

  meditations.forEach((m) => {
    const d = new Date(m.completed_at);
    if (d.getFullYear() === currentYearlyChartYear) {
      const isComplete = (m.duration || 0) >= 3600;
      const isPartial = (m.duration || 0) < 3600;
      const match = (isComplete && filterComplete) || (isPartial && filterPartial);
      if (match) {
        const monthIdx = d.getMonth();
        monthlySeconds[monthIdx] += (m.duration || 0);
        monthlyCounts[monthIdx]++;
      }
    }
  });

  let maxSecs = Math.max(...monthlySeconds);

  monthlySeconds.forEach((secs, i) => {
    const heightPercent = maxSecs > 0 ? (secs / maxSecs) * 100 : 0;

    const sesLabel = currentLang === "es"
      ? `${monthlyCounts[i]} ${monthlyCounts[i] === 1 ? 'sesión' : 'sesiones'}`
      : `${monthlyCounts[i]} ${monthlyCounts[i] === 1 ? 'session' : 'sessions'}`;
    const tooltipText = `${fullMonthNames[i]}: ${sesLabel} (${formatExactDuration(secs)})`;

    const colDiv = document.createElement("div");
    colDiv.className = "chart-column";
    colDiv.style.cursor = "pointer";
    colDiv.innerHTML = `
      <span class="bar-count">${monthlyCounts[i]}</span>
      <div class="bar-fill-wrap" data-tooltip="${tooltipText}">
        <div class="bar-fill" style="height: ${heightPercent}%"></div>
      </div>
      <span class="chart-label">${months[i]}</span>
    `;

    // Al hacer click, ir a la pestaña mensual y cargar este mes
    colDiv.addEventListener("click", () => {
      currentCalMonth = i;
      currentCalYear = currentYearlyChartYear;
      renderMonthlyHeatmap(currentMeditations);
      switchStatsView("heatmap");
    });

    container.appendChild(colDiv);
  });
}

// Historial Cronológico de Meditaciones (Lista con Filtros)
function renderHistoryList(meditations) {
  const statsList = document.getElementById("stats-list");
  if (!statsList) return;
  statsList.innerHTML = "";

  const filterComplete = document.getElementById("history-filter-complete")?.checked ?? true;
  const filterPartial = document.getElementById("history-filter-partial")?.checked ?? true;

  const filtered = meditations.filter((m) => {
    const isComplete = (m.duration || 0) >= 3600;
    const isPartial = (m.duration || 0) < 3600;
    return (isComplete && filterComplete) || (isPartial && filterPartial);
  });

  filtered.forEach((m) => {
    const d = new Date(m.completed_at);
    const dateStr = d.toLocaleDateString(currentLang === "es" ? "es-AR" : "en-US", {
      day: "numeric", month: "long", year: "numeric",
    });
    const timeStr = d.toLocaleTimeString(currentLang === "es" ? "es-AR" : "en-US", {
      hour: "2-digit", minute: "2-digit",
    });

    const entry = document.createElement("div");
    entry.className = "meditation-entry";
    entry.innerHTML = `
      <div class="med-info">
        <span class="med-icon">🧘</span>
        <span class="med-date">${dateStr}</span>
        <span class="med-time">${timeStr} <span style="opacity: 0.6; font-size: 0.75rem; margin-left: 6px;">(${formatDuration(m.duration || 0)})</span></span>
      </div>
      <button class="btn-delete-entry" data-id="${m.id}" title="${currentLang === 'es' ? 'Eliminar registro' : 'Delete record'}">🗑️</button>
    `;

    // Vincular botón borrar individual
    entry.querySelector(".btn-delete-entry").addEventListener("click", () => {
      meditationIdToDelete = m.id;
      document.getElementById("delete-session-error").classList.add("hidden");
      openModal(modalDeleteSession);
    });

    statsList.appendChild(entry);
  });
}

// Mapa de Calor Mensual (Calendario con Navegación y Filtros)
function renderMonthlyHeatmap(meditations) {
  const container = document.getElementById("monthly-heatmap-container");
  if (!container) return;
  container.innerHTML = "";

  const labelEl = document.getElementById("calendar-month-year-label");
  if (labelEl) {
    const monthNamesEs = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthNames = currentLang === "es" ? monthNamesEs : monthNamesEn;
    labelEl.textContent = `${monthNames[currentCalMonth]} ${currentCalYear}`;
  }

  const filterComplete = document.getElementById("cal-filter-complete")?.checked ?? true;
  const filterPartial = document.getElementById("cal-filter-partial")?.checked ?? false;

  const totalDays = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentCalYear, currentCalMonth, 1).getDay();
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const dayMedMap = new Map();
  meditations.forEach((m) => {
    const d = new Date(m.completed_at);
    if (d.getFullYear() === currentCalYear && d.getMonth() === currentCalMonth) {
      const isComplete = (m.duration || 0) >= 3600;
      const isPartial = (m.duration || 0) < 3600;
      const match = (isComplete && filterComplete) || (isPartial && filterPartial);
      if (match) {
        const key = getLocalDateStr(d);
        dayMedMap.set(key, (dayMedMap.get(key) || 0) + (m.duration || 0));
      }
    }
  });

  // Render Weekday headers
  const weekdaysEs = ["L", "M", "M", "J", "V", "S", "D"];
  const weekdaysEn = ["M", "T", "W", "T", "F", "S", "S"];
  const weekdays = currentLang === "es" ? weekdaysEs : weekdaysEn;

  const headerDiv = document.createElement("div");
  headerDiv.className = "heatmap-weekdays";
  weekdays.forEach(day => {
    const span = document.createElement("span");
    span.textContent = day;
    headerDiv.appendChild(span);
  });
  container.appendChild(headerDiv);

  const gridDiv = document.createElement("div");
  gridDiv.className = "heatmap-grid";

  // Insert offset cells
  for (let i = 0; i < startOffset; i++) {
    const cell = document.createElement("div");
    cell.className = "heatmap-cell heatmap-empty";
    gridDiv.appendChild(cell);
  }

  // Insert active day cells
  for (let day = 1; day <= totalDays; day++) {
    const dateObj = new Date(currentCalYear, currentCalMonth, day);
    const dateStr = getLocalDateStr(dateObj);
    const seconds = dayMedMap.get(dateStr) || 0;

    let level = 0;
    if (seconds > 0) {
      if (seconds < 600) level = 1;
      else if (seconds < 1800) level = 2;
      else if (seconds < 3600) level = 3;
      else level = 4;
    }

    const cell = document.createElement("div");
    cell.className = `heatmap-cell level-${level}`;
    cell.textContent = day;

    const dateFormatted = dateObj.toLocaleDateString(currentLang === 'es' ? 'es-AR' : 'en-US', {
      day: 'numeric', month: 'short'
    });
    const tooltipText = `${dateFormatted}: ${formatExactDuration(seconds)}`;
    cell.setAttribute("data-tooltip", tooltipText);

    gridDiv.appendChild(cell);
  }

  container.appendChild(gridDiv);
}

// Cargar y Renderizar Estadísticas
async function loadAndRenderStats() {
  const loadingEl = document.getElementById("stats-loading");
  const contentEl = document.getElementById("stats-content");
  const emptyEl = document.getElementById("stats-empty");
  const statHours = document.getElementById("stat-hours");
  const statStreak = document.getElementById("stat-streak");
  const statComplete = document.getElementById("stat-complete");
  const statPartial = document.getElementById("stat-partial");
  const statsList = document.getElementById("stats-list");

  const periodWeekStats = document.getElementById("period-week-stats");
  const periodMonthStats = document.getElementById("period-month-stats");
  const periodYearStats = document.getElementById("period-year-stats");

  loadingEl.classList.remove("hidden");
  contentEl.classList.add("hidden");
  emptyEl.classList.add("hidden");

  try {
    const res = await fetch("/api/meditations", { credentials: "include" });
    const data = await res.json();

    loadingEl.classList.add("hidden");

    if (!res.ok || !data.meditations || data.total === 0) {
      currentMeditations = [];
      emptyEl.classList.remove("hidden");
      return;
    }

    // Guardar en caché local
    currentMeditations = data.meditations;

    // Sumar duración total en segundos y formatear exacto
    const totalSeconds = currentMeditations.reduce((acc, m) => acc + (m.duration || 0), 0);
    statHours.textContent = formatExactDuration(totalSeconds);
    statStreak.textContent = calculateStreak(currentMeditations);

    // Contar sesiones completas (1h = 3600 segundos) y parciales (< 1h)
    const completeCount = currentMeditations.filter(m => (m.duration || 0) >= 3600).length;
    const partialCount = currentMeditations.filter(m => (m.duration || 0) < 3600).length;
    statComplete.textContent = completeCount;
    statPartial.textContent = partialCount;

    // Calcular estadísticas por periodos (semana, mes, año) en hora local
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

    // Primer día del año actual
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    firstDayOfYear.setHours(0, 0, 0, 0);

    // Filtrar sesiones
    const weekSessions = currentMeditations.filter(m => new Date(m.completed_at) >= monday);
    const weekDuration = weekSessions.reduce((acc, m) => acc + (m.duration || 0), 0);

    const monthSessions = currentMeditations.filter(m => new Date(m.completed_at) >= firstDayOfMonth);
    const monthDuration = monthSessions.reduce((acc, m) => acc + (m.duration || 0), 0);

    const yearSessions = currentMeditations.filter(m => new Date(m.completed_at) >= firstDayOfYear);
    const yearDuration = yearSessions.reduce((acc, m) => acc + (m.duration || 0), 0);

    // Pintar valores de periodo formateados bilingües
    periodWeekStats.textContent = translations[currentLang].periodStatFormat(weekSessions.length, formatExactDuration(weekDuration));
    periodMonthStats.textContent = translations[currentLang].periodStatFormat(monthSessions.length, formatExactDuration(monthDuration));
    periodYearStats.textContent = translations[currentLang].periodStatFormat(yearSessions.length, formatExactDuration(yearDuration));

    // Dibujar habit tracker de la semana
    renderWeeklyTracker(currentMeditations);

    // Dibujar gráfico de barras anual
    renderYearlyBarChart(currentMeditations);

    // Dibujar mapa de calor mensual
    renderMonthlyHeatmap(currentMeditations);

    // Cargar historial cronológico
    renderHistoryList(currentMeditations);

    contentEl.classList.remove("hidden");
  } catch {
    loadingEl.classList.add("hidden");
    emptyEl.classList.remove("hidden");
    emptyEl.textContent = translations[currentLang].errorStatsLoad;
  }
}

// Pestañas de Estadísticas (Toggle panel)
function switchStatsView(viewName) {
  activeStatsView = viewName;
  const btnViewList = document.getElementById("btn-view-list");
  const btnViewHeatmap = document.getElementById("btn-view-heatmap");
  const btnViewYearly = document.getElementById("btn-view-yearly");

  const panelList = document.getElementById("stats-panel-list");
  const panelHeatmap = document.getElementById("stats-panel-heatmap");
  const panelYearly = document.getElementById("stats-panel-yearly");

  btnViewList?.classList.toggle("active", viewName === "list");
  btnViewHeatmap?.classList.toggle("active", viewName === "heatmap");
  btnViewYearly?.classList.toggle("active", viewName === "yearly");

  panelList?.classList.toggle("hidden", viewName !== "list");
  panelHeatmap?.classList.toggle("hidden", viewName !== "heatmap");
  panelYearly?.classList.toggle("hidden", viewName !== "yearly");
}

document.getElementById("btn-view-list")?.addEventListener("click", () => switchStatsView("list"));
document.getElementById("btn-view-heatmap")?.addEventListener("click", () => switchStatsView("heatmap"));
document.getElementById("btn-view-yearly")?.addEventListener("click", () => switchStatsView("yearly"));

// Navegación mensual y Filtros del Calendario
document.getElementById("btn-prev-month")?.addEventListener("click", () => {
  currentCalMonth--;
  if (currentCalMonth < 0) {
    currentCalMonth = 11;
    currentCalYear--;
  }
  renderMonthlyHeatmap(currentMeditations);
});

document.getElementById("btn-next-month")?.addEventListener("click", () => {
  currentCalMonth++;
  if (currentCalMonth > 11) {
    currentCalMonth = 0;
    currentCalYear++;
  }
  renderMonthlyHeatmap(currentMeditations);
});

document.getElementById("cal-filter-complete")?.addEventListener("change", () => {
  renderMonthlyHeatmap(currentMeditations);
});

document.getElementById("cal-filter-partial")?.addEventListener("change", () => {
  renderMonthlyHeatmap(currentMeditations);
});

// Navegación anual y Filtros del Gráfico Anual
document.getElementById("btn-prev-year")?.addEventListener("click", () => {
  currentYearlyChartYear--;
  renderYearlyBarChart(currentMeditations);
});

document.getElementById("btn-next-year")?.addEventListener("click", () => {
  currentYearlyChartYear++;
  renderYearlyBarChart(currentMeditations);
});

document.getElementById("yearly-filter-complete")?.addEventListener("change", () => {
  renderYearlyBarChart(currentMeditations);
});

document.getElementById("yearly-filter-partial")?.addEventListener("change", () => {
  renderYearlyBarChart(currentMeditations);
});

document.getElementById("history-filter-complete")?.addEventListener("change", () => {
  renderHistoryList(currentMeditations);
});

document.getElementById("history-filter-partial")?.addEventListener("change", () => {
  renderHistoryList(currentMeditations);
});

// Actualizar etiqueta del botón de alternancia
function updateNavToggleText() {
  if (!navToggleStats) return;
  const isStatsActive = !sectionStats.classList.contains("hidden");
  const icon = isStatsActive ? "🏠" : "📊";
  const textKey = isStatsActive ? "navHome" : "navStats";
  const text = translations[currentLang][textKey] || (isStatsActive ? "Inicio" : "Estadísticas");

  const iconEl = navToggleStats.querySelector(".nav-icon");
  const textEl = navToggleStats.querySelector(".nav-text");
  if (iconEl && textEl) {
    iconEl.textContent = icon;
    textEl.setAttribute("data-i18n", textKey);
    textEl.textContent = text;
  }

  // Actualizar también el botón del dropdown de usuario
  const dropdownToggleStats = document.getElementById("dropdown-toggle-stats");
  if (dropdownToggleStats) {
    const dropIconEl = dropdownToggleStats.querySelector(".dropdown-stats-icon");
    const dropTextEl = dropdownToggleStats.querySelector(".dropdown-stats-text");
    if (dropIconEl && dropTextEl) {
      dropIconEl.textContent = icon;
      dropTextEl.setAttribute("data-i18n", textKey);
      dropTextEl.textContent = text;
    }
  }
}

// Cambiar entre vista Home y Estadísticas
function switchMainView(viewName) {
  if (viewName === "stats") {
    sectionHome?.classList.add("hidden");
    sectionStats?.classList.remove("hidden");
    switchStatsView("list"); // Resetear vistas internas de stats
    loadAndRenderStats();
  } else {
    sectionStats?.classList.add("hidden");
    sectionHome?.classList.remove("hidden");
  }
  updateNavToggleText();
}

// Manejador del botón nav superior
navToggleStats?.addEventListener("click", () => {
  const isStatsActive = !sectionStats.classList.contains("hidden");
  switchMainView(isStatsActive ? "home" : "stats");
});

// Manejador del botón del dropdown de usuario
document.getElementById("dropdown-toggle-stats")?.addEventListener("click", () => {
  // Ocultar dropdown al hacer click
  userDropdown?.classList.add("hidden");
  userMenuBtn?.classList.remove("open");
  const isStatsActive = !sectionStats.classList.contains("hidden");
  switchMainView(isStatsActive ? "home" : "stats");
});

// Botones de Confirmación de Borrado de Sesión
document.getElementById("btn-delete-session-no")?.addEventListener("click", () => closeModal(modalDeleteSession));

document.getElementById("btn-delete-session-yes")?.addEventListener("click", async () => {
  const errorEl = document.getElementById("delete-session-error");
  const yesBtn = document.getElementById("btn-delete-session-yes");
  errorEl.classList.add("hidden");
  yesBtn.disabled = true;
  const originalText = yesBtn.textContent;
  yesBtn.textContent = translations[currentLang].statusDeleting;

  try {
    const res = await fetch(`/api/meditations/${meditationIdToDelete}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
      errorEl.textContent = data.error || (currentLang === "es" ? "Error al eliminar" : "Error deleting");
      errorEl.classList.remove("hidden");
      return;
    }

    closeModal(modalDeleteSession);
    loadAndRenderStats(); // Recargar estadísticas dinámicamente
  } catch {
    errorEl.textContent = translations[currentLang].errorConnectionShort;
    errorEl.classList.remove("hidden");
  } finally {
    yesBtn.disabled = false;
    yesBtn.textContent = originalText;
  }
});

// ════════════════════════════════════════════════
// MODAL: MEDITACIÓN COMPLETADA
// ════════════════════════════════════════════════
function showMeditationDoneModal() {
  const savedMsg = document.getElementById("meditation-saved-msg");
  if (savedMsg) savedMsg.classList.add("hidden");

  const yesBtn = document.getElementById("btn-confirm-yes");
  const noBtn = document.getElementById("btn-confirm-no");
  if (yesBtn) yesBtn.disabled = false;

  openModal(modalMeditationDone);
}

document.getElementById("btn-confirm-no")?.addEventListener("click", () => closeModal(modalMeditationDone));

document.getElementById("btn-confirm-yes")?.addEventListener("click", async () => {
  const savedMsg = document.getElementById("meditation-saved-msg");
  const yesBtn = document.getElementById("btn-confirm-yes");
  yesBtn.disabled = true;
  yesBtn.textContent = translations[currentLang].statusSaving;

  if (!currentUser) {
    // Si no está logueado, le pedimos que inicie sesión
    closeModal(modalMeditationDone);
    openModal(modalLogin);
    yesBtn.disabled = false;
    yesBtn.textContent = translations[currentLang].btnYes;
    return;
  }

  try {
    const res = await fetch("/api/meditations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ duration: lastSessionDuration })
    });

    if (res.ok) {
      if (savedMsg) {
        savedMsg.classList.remove("hidden");
        savedMsg.textContent = translations[currentLang].meditationSaved;
      }
      setTimeout(() => closeModal(modalMeditationDone), 1800);
    } else {
      closeModal(modalMeditationDone);
    }
  } catch {
    closeModal(modalMeditationDone);
  } finally {
    yesBtn.disabled = false;
    yesBtn.textContent = translations[currentLang].btnYes;
  }
});

// ════════════════════════════════════════════════
// TIMER — LÓGICA PRINCIPAL
// ════════════════════════════════════════════════
function generateRandomSignals() {
  const count = Math.floor(Math.random() * 3) + 3;
  const windowStart = 5;
  const windowEnd = 55;
  const slotSize = (windowEnd - windowStart) / count;
  const minutes = [];
  for (let i = 0; i < count; i++) {
    const slotStart = windowStart + i * slotSize;
    const slotEnd = slotStart + slotSize;
    const minute = Math.floor(Math.random() * (slotEnd - slotStart)) + Math.floor(slotStart);
    minutes.push(minute);
  }
  console.log("%c🎲 MODO ALEATORIO ACTIVADO", "color: #a78bfa; font-weight: bold; font-size: 14px;");
  console.log(`⏰ Señales en los minutos: ${minutes.join(", ")}`);
  return minutes;
}

function updateDisplay(secondsLeft) {
  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  timerDisplay.textContent = `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function shouldPlaySoundB(elapsedMinutes) {
  const option = soundBSelect.value;
  if (option === "3") return [15, 30, 45].includes(elapsedMinutes);
  if (option === "2") return [20, 40].includes(elapsedMinutes);
  if (option === "1") return elapsedMinutes === 30;
  if (option === "random") return randomSignalMinutes.includes(elapsedMinutes);
  return false;
}

function onTick() {
  if (isPaused) return;

  if (currentSeconds <= 0) {
    endSession();
    return;
  }

  currentSeconds--;
  updateDisplay(currentSeconds);

  if (currentSeconds % 60 === 0 && currentSeconds < TOTAL_SECONDS) {
    const elapsedMinutes = TOTAL_MINUTES - currentSeconds / 60;

    if (elapsedMinutes === 50 && soundCCheck.checked) {
      soundC.currentTime = 0;
      soundC.play().catch((e) => console.log(e));
    }

    if (shouldPlaySoundB(elapsedMinutes)) {
      soundB.currentTime = 0;
      soundB.play().catch((e) => console.log(e));
    }
  }
}

function startSession() {
  if (isRunning) return;

  soundB.load();
  soundC.load();

  if (soundBSelect.value === "random") {
    randomSignalMinutes = generateRandomSignals();
  } else {
    randomSignalMinutes = [];
  }

  isRunning = true;
  isPaused = false;
  currentSeconds = TOTAL_SECONDS;
  updateDisplay(currentSeconds);

  startBtn.classList.add("hidden");
  stopBtn.classList.remove("hidden");
  pauseBtn.classList.remove("hidden");
  pauseBtn.textContent = translations[currentLang].btnPause;
  timerDisplay.classList.add("active");
  timerDisplay.classList.remove("paused");
  statusMsg.textContent = translations[currentLang].statusRunning;

  soundBSelect.disabled = true;
  soundCCheck.disabled = true;

  // Ocultar tarjetas de configuración y previsualización, y el encabezado
  homeHeader?.classList.add("hidden");
  controlsCard?.classList.add("hidden");
  previewCard?.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });

  requestWakeLock();

  soundA.currentTime = 0;
  soundA.play().catch((e) => console.error("Error al iniciar Sonido A:", e));

  timerInterval = setInterval(onTick, 1000);
}

function pauseSession() {
  if (!isRunning) return;
  isPaused = !isPaused;

  if (isPaused) {
    timerDisplay.classList.remove("active");
    timerDisplay.classList.add("paused");
    pauseBtn.textContent = translations[currentLang].btnResume;
    statusMsg.textContent = translations[currentLang].statusPaused;
    releaseWakeLock();
  } else {
    timerDisplay.classList.add("active");
    timerDisplay.classList.remove("paused");
    pauseBtn.textContent = translations[currentLang].btnPause;
    statusMsg.textContent = translations[currentLang].statusRunning;
    requestWakeLock();
  }
}

// Detener sesión → mostrar modal "¿marcar como completada?"
function stopSession() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = false;

  // Guardar la duración real transcurrida en segundos
  lastSessionDuration = TOTAL_SECONDS - currentSeconds;

  currentSeconds = TOTAL_SECONDS;
  updateDisplay(currentSeconds);

  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  pauseBtn.classList.add("hidden");
  timerDisplay.classList.remove("active", "paused");
  statusMsg.textContent = translations[currentLang].statusStopped;

  soundBSelect.disabled = false;
  soundCCheck.disabled = false;

  // Volver a mostrar tarjetas de configuración y previsualización, y el encabezado
  homeHeader?.classList.remove("hidden");
  controlsCard?.classList.remove("hidden");
  previewCard?.classList.remove("hidden");

  releaseWakeLock();

  // Mostrar modal de meditación completada
  showMeditationDoneModal();
}

// Fin natural de la sesión (llegó a 0) → también muestra el modal
function endSession() {
  clearInterval(timerInterval);
  isRunning = false;
  isPaused = false;

  // Guardar la sesión como completada al 100%
  lastSessionDuration = TOTAL_SECONDS;

  startBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
  pauseBtn.classList.add("hidden");
  timerDisplay.classList.remove("active", "paused");
  statusMsg.textContent = translations[currentLang].statusFinished;

  soundBSelect.disabled = false;
  soundCCheck.disabled = false;

  // Volver a mostrar tarjetas de configuración y previsualización, y el encabezado
  homeHeader?.classList.remove("hidden");
  controlsCard?.classList.remove("hidden");
  previewCard?.classList.remove("hidden");

  releaseWakeLock();

  soundA.currentTime = 0;
  soundA.play();

  // Pequeño delay para que suene el gong antes de abrir el modal
  setTimeout(showMeditationDoneModal, 1500);
}

// ════════════════════════════════════════════════
// WAKE LOCK
// ════════════════════════════════════════════════
async function requestWakeLock() {
  try {
    if ("wakeLock" in navigator) {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => console.log("Wake Lock liberado"));
    }
  } catch (err) {
    console.error(`Error Wake Lock: ${err.name}, ${err.message}`);
  }
}

function releaseWakeLock() {
  if (wakeLock !== null) {
    wakeLock.release().then(() => { wakeLock = null; });
  }
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && isRunning && !isPaused && wakeLock === null) {
    requestWakeLock();
  }
});

// ════════════════════════════════════════════════
// PREVIEW DE SONIDOS
// ════════════════════════════════════════════════
function previewSound(soundId) {
  const audio = document.getElementById(soundId);
  if (audio) {
    audio.currentTime = 0;
    audio.play().catch(async (err) => {
      console.error("Error al reproducir audio:", err);
      await showCustomAlert(
        translations[currentLang].modalAlertTitle,
        currentLang === "es"
          ? "No se pudo reproducir. Asegurate de que el archivo mp3 esté cargado correctamente."
          : "Could not play. Make sure the mp3 file is loaded correctly."
      );
    });
  }
}

// ════════════════════════════════════════════════
// EVENT LISTENERS TIMER
// ════════════════════════════════════════════════
startBtn?.addEventListener("click", startSession);
stopBtn?.addEventListener("click", stopSession);
pauseBtn?.addEventListener("click", pauseSession);

// ════════════════════════════════════════════════
// INICIALIZACIÓN
// ════════════════════════════════════════════════
updateLanguage();
updateDisplay(currentSeconds);
checkSession(); // Verifica si hay sesión activa al cargar

/**
 * Google Apps Script para verificación de acceso por código de 6 dígitos.
 * Publicar como Web App:
 * - Ejecutar como: Yo
 * - Quién tiene acceso: Cualquier usuario
 *
 * Luego copie la URL /exec y péguela en index.html:
 * const GAS_2FA_ENDPOINT = "https://script.google.com/macros/s/XXXX/exec";
 */

const AUTHORIZED_EMAIL = 'reservas@mycuscotrip.com';
const CODE_TTL_SECONDS = 10 * 60;

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || '{}');
    const action = payload.action;
    const email = String(payload.email || '').trim().toLowerCase();

    if (email !== AUTHORIZED_EMAIL) {
      return jsonResponse({ ok: false, message: 'Correo no autorizado.' });
    }

    if (action === 'sendCode') {
      return sendCode_(email);
    }

    if (action === 'verifyCode') {
      return verifyCode_(email, String(payload.code || '').trim());
    }

    return jsonResponse({ ok: false, message: 'Acción no válida.' });
  } catch (err) {
    return jsonResponse({ ok: false, message: err.message || 'Error interno.' });
  }
}

function sendCode_(email) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const cache = CacheService.getScriptCache();
  cache.put('login_code_' + email, code, CODE_TTL_SECONDS);

  MailApp.sendEmail({
    to: email,
    subject: 'Código de acceso - Viator Supplier',
    htmlBody:
      '<div style="font-family:Arial,sans-serif;color:#1f2937">' +
      '<h2>Código de acceso</h2>' +
      '<p>Use este código para ingresar al panel:</p>' +
      '<div style="font-size:32px;font-weight:800;letter-spacing:6px;color:#007a78;margin:18px 0">' + code + '</div>' +
      '<p>Este código vence en 10 minutos.</p>' +
      '</div>'
  });

  return jsonResponse({ ok: true });
}

function verifyCode_(email, code) {
  if (!/^\d{6}$/.test(code)) {
    return jsonResponse({ ok: false, message: 'Código inválido.' });
  }

  const cache = CacheService.getScriptCache();
  const saved = cache.get('login_code_' + email);

  if (!saved) {
    return jsonResponse({ ok: false, message: 'Código vencido. Solicite uno nuevo.' });
  }

  if (saved !== code) {
    return jsonResponse({ ok: false, message: 'Código incorrecto.' });
  }

  cache.remove('login_code_' + email);
  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

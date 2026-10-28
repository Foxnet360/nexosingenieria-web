export interface ContactFormData {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  projectSize?: string;
  budget?: string;
  message?: string;
  page?: 'Contacto' | 'Cotizar' | 'Newsletter' | string;
}

/**
 * Escapes HTML characters to prevent XSS in email bodies.
 */
function escapeHtml(str: string = ''): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates internal notification email for comercial@nexosingenieria.com
 */
export function generateNotificationHtml(data: ContactFormData): string {
  const safeName = escapeHtml(data.name || 'No proporcionado');
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || 'No proporcionado');
  const safeCompany = escapeHtml(data.company || 'No especificada');
  const safeService = escapeHtml(data.service || 'Consulta General');
  const safeProjectSize = data.projectSize ? escapeHtml(data.projectSize) : null;
  const safeBudget = data.budget ? escapeHtml(data.budget) : null;
  const safeMessage = escapeHtml(data.message || 'Sin mensaje adicional').replace(/\n/g, '<br/>');
  const submissionDate = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Nuevo Lead - Nexos Ingeniería</title>
</head>
<body style="margin:0;padding:24px;background-color:#0b0f19;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f3f4f6;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#111827;border-radius:12px;border:1px solid #1f2937;overflow:hidden;">
    <tr>
      <td style="padding:28px 32px;background:linear-gradient(135deg,#111827 0%,#1e293b 100%);border-bottom:2px solid #00d4ff;">
        <span style="font-size:12px;font-weight:700;color:#00d4ff;letter-spacing:1.5px;text-transform:uppercase;">NUEVO LEAD WEB</span>
        <h1 style="margin:8px 0 0 0;font-size:22px;color:#ffffff;font-weight:600;">Solicitud desde ${escapeHtml(data.page || 'Sitio Web')}</h1>
        <p style="margin:4px 0 0 0;font-size:13px;color:#9ca3af;">Radicado el ${submissionDate} (Hora Colombia)</p>
      </td>
    </tr>
    <tr>
      <td style="padding:32px;">
        <table width="100%" border="0" cellpadding="8" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;width:140px;padding:10px 0;">Nombre:</td>
            <td style="color:#ffffff;font-weight:600;padding:10px 0;">${safeName}</td>
          </tr>
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;padding:10px 0;">Email:</td>
            <td style="color:#00d4ff;padding:10px 0;"><a href="mailto:${safeEmail}" style="color:#00d4ff;text-decoration:none;">${safeEmail}</a></td>
          </tr>
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;padding:10px 0;">Teléfono:</td>
            <td style="color:#ffffff;padding:10px 0;">${safePhone}</td>
          </tr>
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;padding:10px 0;">Empresa:</td>
            <td style="color:#ffffff;padding:10px 0;">${safeCompany}</td>
          </tr>
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;padding:10px 0;">Servicio:</td>
            <td style="color:#00d4ff;font-weight:600;padding:10px 0;">${safeService}</td>
          </tr>
          ${
            safeProjectSize
              ? `
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;padding:10px 0;">Dimensión:</td>
            <td style="color:#ffffff;padding:10px 0;">${safeProjectSize}</td>
          </tr>`
              : ''
          }
          ${
            safeBudget
              ? `
          <tr style="border-bottom:1px solid #1f2937;">
            <td style="color:#9ca3af;font-weight:600;padding:10px 0;">Presupuesto:</td>
            <td style="color:#ffffff;padding:10px 0;">${safeBudget}</td>
          </tr>`
              : ''
          }
        </table>

        <div style="margin-top:24px;padding:20px;background-color:#0b0f19;border-radius:8px;border:1px solid #1f2937;">
          <h3 style="margin:0 0 10px 0;font-size:13px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Detalles del Requerimiento</h3>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#e5e7eb;">${safeMessage}</p>
        </div>

        <div style="margin-top:28px;text-align:center;">
          <a href="mailto:${safeEmail}?subject=Re:%20Contacto%20Nexos%20Ingenier%C3%ADa" style="display:inline-block;padding:12px 28px;background-color:#00d4ff;color:#0a0e1a;font-weight:600;font-size:14px;border-radius:8px;text-decoration:none;">Responder al Cliente</a>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 32px;background-color:#0b0f19;border-top:1px solid #1f2937;text-align:center;font-size:12px;color:#6b7280;">
        Notificación generada automáticamente por el sitio web de Nexos Ingeniería S.A.S.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Generates high-end customer auto-reply with Ley 1581 (Habeas Data) compliance.
 */
export function generateAutoReplyHtml(data: ContactFormData): string {
  const customerName = escapeHtml(data.name || 'Cliente');
  const serviceName = escapeHtml(data.service || 'Servicios de Ingeniería e Infraestructura');
  const submissionDate = new Date().toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hemos recibido su mensaje - Nexos Ingeniería</title>
</head>
<body style="margin:0;padding:24px 12px;background-color:#05070e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f3f4f6;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background-color:#0a0e1a;border-radius:14px;border:1px solid #1f2937;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,0.5);">
    <!-- Header with Branding -->
    <tr>
      <td style="padding:32px 36px;background:linear-gradient(180deg,#111827 0%,#0a0e1a 100%);border-bottom:2px solid #00d4ff;text-align:center;">
        <span style="font-size:24px;font-weight:800;letter-spacing:1px;color:#ffffff;display:block;">
          NEXOS <span style="color:#00d4ff;">INGENIERÍA</span>
        </span>
        <span style="display:inline-block;margin-top:6px;font-size:11px;font-weight:600;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">
          Smart Building Partner · Infraestructura &amp; Conectividad
        </span>
      </td>
    </tr>

    <!-- Main Message -->
    <tr>
      <td style="padding:36px;">
        <h2 style="margin:0 0 12px 0;font-size:22px;color:#ffffff;font-weight:600;">
          ¡Hola, ${customerName}!
        </h2>
        <p style="margin:0 0 20px 0;font-size:15px;line-height:1.6;color:#d1d5db;">
          Confirmamos la recepción de tu consulta sobre <strong style="color:#00d4ff;">${serviceName}</strong>. Nuestro equipo de ingenieros ya está revisando los requerimientos de tu proyecto para brindarte la mejor solución técnica y comercial.
        </p>

        <!-- SLA Commitment Banner -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.25);border-radius:10px;margin:24px 0;">
          <tr>
            <td style="padding:18px 20px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" valign="top" style="font-size:22px;line-height:1;color:#00d4ff;">⏱️</td>
                  <td style="padding-left:12px;">
                    <div style="font-size:14px;font-weight:600;color:#ffffff;margin-bottom:2px;">Compromiso de Respuesta</div>
                    <div style="font-size:13px;color:#9ca3af;line-height:1.4;">
                      Un especialista se pondrá en contacto contigo en un plazo máximo de <strong style="color:#00d4ff;">24 horas hábiles</strong>.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Request Summary Card -->
        <div style="background-color:#111827;border-radius:10px;border:1px solid #1f2937;padding:20px;margin:24px 0;">
          <h3 style="margin:0 0 14px 0;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">
            Resumen de tu Solicitud
          </h3>
          <table width="100%" border="0" cellpadding="6" cellspacing="0" style="font-size:13px;border-collapse:collapse;">
            <tr style="border-bottom:1px solid #1a2234;">
              <td style="color:#9ca3af;width:120px;padding:6px 0;">Fecha:</td>
              <td style="color:#ffffff;padding:6px 0;">${submissionDate}</td>
            </tr>
            <tr style="border-bottom:1px solid #1a2234;">
              <td style="color:#9ca3af;padding:6px 0;">Servicio:</td>
              <td style="color:#00d4ff;font-weight:600;padding:6px 0;">${serviceName}</td>
            </tr>
            ${
              data.company
                ? `
            <tr style="border-bottom:1px solid #1a2234;">
              <td style="color:#9ca3af;padding:6px 0;">Empresa:</td>
              <td style="color:#ffffff;padding:6px 0;">${escapeHtml(data.company)}</td>
            </tr>`
                : ''
            }
            ${
              data.message
                ? `
            <tr>
              <td style="color:#9ca3af;padding:8px 0 0 0;" valign="top">Requerimiento:</td>
              <td style="color:#d1d5db;padding:8px 0 0 0;line-height:1.5;">${escapeHtml(data.message)}</td>
            </tr>`
                : ''
            }
          </table>
        </div>

        <!-- WhatsApp Urgent CTA -->
        <div style="margin:28px 0 10px 0;text-align:center;">
          <p style="margin:0 0 12px 0;font-size:13px;color:#9ca3af;">
            ¿Tienes una urgencia técnica o necesitas soporte inmediato?
          </p>
          <a href="https://wa.me/573155089404?text=Hola,%20acabo%20de%20enviar%20un%20formulario%20web%20y%20necesito%20atenci%C3%B3n%20prioritaria" style="display:inline-block;padding:12px 26px;background-color:#10b981;color:#ffffff;font-weight:600;font-size:14px;border-radius:8px;text-decoration:none;">
            Chat Directo por WhatsApp
          </a>
        </div>
      </td>
    </tr>

    <!-- Contact & Channels Footer -->
    <tr>
      <td style="padding:24px 36px;background-color:#111827;border-top:1px solid #1f2937;font-size:13px;color:#9ca3af;">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <strong style="color:#ffffff;">Nexos Ingeniería S.A.S.</strong><br>
              Armenia, Quindío — Eje Cafetero y cobertura nacional<br>
              Línea Comercial: +57 (315) 508-9404 | comercial@nexosingenieria.com
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Legal Compliance Notice (Ley 1581 de 2012) -->
    <tr>
      <td style="padding:22px 36px;background-color:#05070e;border-top:1px solid #1a2234;font-size:11px;line-height:1.6;color:#6b7280;text-align:justify;">
        <strong style="color:#9ca3af;display:block;margin-bottom:6px;text-align:left;">
          AVISO DE PRIVACIDAD Y PROTECCIÓN DE DATOS PERSONALES (Ley 1581 de 2012 y Decreto 1377 de 2013)
        </strong>
        En cumplimiento de la legislación colombiana de protección de datos personales, <strong>NEXOS INGENIERÍA S.A.S.</strong> le informa que los datos suministrados a través de nuestro sitio web son tratados de manera confidencial y segura con la única finalidad de atender, dar trámite y responder a su solicitud comercial y técnica.<br><br>
        Como titular de los datos, usted tiene derecho a conocer, actualizar, rectificar y solicitar la supresión de sus datos personales, así como revocar la autorización otorgada para su tratamiento (derechos ARCO). Para ejercer estos derechos o consultar nuestra política completa, puede comunicarse al correo <a href="mailto:comercial@nexosingenieria.com" style="color:#00d4ff;text-decoration:none;">comercial@nexosingenieria.com</a> o consultar nuestros <a href="https://nexosingenieria.com/terminos" style="color:#00d4ff;text-decoration:none;">Términos y Condiciones</a> y la <a href="https://nexosingenieria.com/politica-datos" style="color:#00d4ff;text-decoration:none;">Política de Tratamiento de Datos</a>.<br><br>
        <span style="display:block;text-align:center;color:#4b5563;">
          © ${new Date().getFullYear()} Nexos Ingeniería S.A.S. Todos los derechos reservados.
        </span>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

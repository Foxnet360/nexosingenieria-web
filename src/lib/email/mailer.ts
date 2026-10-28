import nodemailer from 'nodemailer';
import { ContactFormData, generateNotificationHtml, generateAutoReplyHtml } from './templates';

export interface SendResult {
  success: boolean;
  message: string;
  configured: boolean;
}

/**
 * Checks if the necessary SMTP environment variables are present.
 */
export function isSmtpConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Creates and configures the Nodemailer transporter.
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || '';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = port === 465; // SSL on 465, TLS/STARTTLS on 587
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    // Useful for cPanel servers where hostname might differ slightly from domain certificate
    tls: {
      rejectUnauthorized:
        process.env.NODE_ENV === 'production' && !process.env.SMTP_ALLOW_SELFSIGNED,
    },
  });
}

/**
 * Sends both internal commercial alert and customer auto-reply acknowledgment.
 */
export async function sendContactEmails(data: ContactFormData): Promise<SendResult> {
  if (!isSmtpConfigured()) {
    console.warn('[Mailer] SMTP not configured. Missing SMTP_HOST, SMTP_USER, or SMTP_PASS.');
    return {
      success: false,
      configured: false,
      message:
        'El canal de correo no está vinculado actualmente. Podés enviar tu mensaje de inmediato a través de nuestra línea directa de WhatsApp.',
    };
  }

  try {
    const transporter = createTransporter();
    const fromAddress = process.env.SMTP_FROM || `Nexos Ingeniería <${process.env.SMTP_USER}>`;
    const commercialEmail = process.env.COMMERCIAL_EMAIL || 'comercial@nexosingenieria.com';

    // 1. Internal notification to commercial team
    const notificationPromise = transporter.sendMail({
      from: fromAddress,
      to: commercialEmail,
      replyTo: data.email,
      subject: `[Nuevo Lead Web] ${data.page || 'Contacto'}: ${data.name || data.email} - ${data.service || 'Consulta General'}`,
      html: generateNotificationHtml(data),
    });

    // 2. Customer auto-reply acknowledgment with Ley 1581 (Habeas Data)
    const autoReplyPromise = transporter.sendMail({
      from: fromAddress,
      to: data.email,
      subject: 'Confirmación de Solicitud - Nexos Ingeniería S.A.S.',
      html: generateAutoReplyHtml(data),
    });

    const [notificationResult, autoReplyResult] = await Promise.allSettled([
      notificationPromise,
      autoReplyPromise,
    ]);

    if (notificationResult.status === 'rejected') {
      console.error('[Mailer] Failed to send commercial notification:', notificationResult.reason);
      throw new Error('Failed to deliver commercial notification');
    }

    if (autoReplyResult.status === 'rejected') {
      console.warn('[Mailer] Customer auto-reply failed:', autoReplyResult.reason);
    }

    return {
      success: true,
      configured: true,
      message:
        '¡Mensaje enviado con éxito! Te hemos enviado un correo de confirmación y nuestro equipo técnico te responderá en menos de 24 horas hábiles.',
    };
  } catch (error) {
    console.error('[Mailer Error]:', error);
    return {
      success: false,
      configured: true,
      message:
        'Ocurrió una interrupción al enviar el mensaje. Podés comunicarte directamente vía WhatsApp.',
    };
  }
}

'use client';

import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

interface EmailData {
  [key: string]: string;
}

export function isEmailConfigured(): boolean {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return false;
  if (
    SERVICE_ID.includes('your-') ||
    TEMPLATE_ID.includes('your-') ||
    PUBLIC_KEY.includes('your-')
  ) {
    return false;
  }
  return true;
}

export async function sendEmail(
  data: EmailData
): Promise<{ success: boolean; message: string; configured: boolean }> {
  if (!isEmailConfigured()) {
    return {
      success: false,
      configured: false,
      message:
        'El canal de correo no está vinculado actualmente. Podés enviar tu mensaje de inmediato a través de nuestra línea directa de WhatsApp.',
    };
  }

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);

    if (response.status === 200) {
      return {
        success: true,
        configured: true,
        message: 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.',
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      configured: true,
      message:
        'Ocurrió una interrupción al enviar el mensaje. Podés comunicarte directamente vía WhatsApp.',
    };
  }
}

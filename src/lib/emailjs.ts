'use client';

import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

interface EmailData {
  [key: string]: string;
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; message: string }> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('EmailJS not configured');
    return {
      success: false,
      message: 'El servicio de correo no está configurado. Por favor contáctenos por teléfono.',
    };
  }

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
    
    if (response.status === 200) {
      return {
        success: true,
        message: 'Mensaje enviado exitosamente. Nos pondremos en contacto pronto.',
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      message: 'Error al enviar el mensaje. Por favor intente nuevamente o contáctenos por teléfono.',
    };
  }
}

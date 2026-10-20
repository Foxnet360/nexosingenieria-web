import { sendEmail } from '@/lib/emailjs';

const WHATSAPP_PHONE = '573155089404';

export interface FormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  whatsappUrl?: string;
}

export function buildWhatsAppLink(text: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

export async function processContactForm(formData: FormData): Promise<FormResponse> {
  // Honeypot anti-spam check
  const honeypot = formData.get('website_hp') as string;
  if (honeypot) {
    // Silent rejection for bots
    return {
      success: true,
      message: '¡Mensaje Enviado!',
    };
  }

  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  const company = ((formData.get('company') as string) || '').trim();
  const service = ((formData.get('service') as string) || '').trim();
  const message = ((formData.get('message') as string) || '').trim();

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = 'Por favor ingresa tu nombre completo.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Por favor ingresa un correo electrónico válido.';
  }

  if (!message || message.length < 10) {
    errors.message = 'Por favor cuéntanos un poco más sobre tu necesidad (mínimo 10 caracteres).';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Por favor corrige los errores en el formulario.',
      errors,
    };
  }

  const waText = `*Nuevo Contacto Web - Nexos Ingeniería*\n\n*Nombre:* ${name}\n*Email:* ${email}${company ? `\n*Empresa:* ${company}` : ''}${service ? `\n*Servicio de Interés:* ${service}` : ''}\n\n*Mensaje:*\n${message}`;
  const whatsappUrl = buildWhatsAppLink(waText);

  try {
    const emailResult = await sendEmail({
      name,
      email,
      company,
      service,
      message,
      page: 'Contacto',
    });

    if (!emailResult.success) {
      return {
        success: false,
        message: emailResult.message,
        whatsappUrl,
      };
    }

    return {
      success: true,
      message:
        '¡Mensaje enviado con éxito! Nuestro equipo técnico te responderá en menos de 24 horas hábiles.',
    };
  } catch (error) {
    console.error('[Form Handler Error] processContactForm:', error);
    return {
      success: false,
      message:
        'Ocurrió una interrupción al enviar tu solicitud. Podés enviarla directamente por WhatsApp con un solo clic.',
      whatsappUrl,
    };
  }
}

export async function processQuoteForm(formData: FormData): Promise<FormResponse> {
  // Honeypot anti-spam check
  const honeypot = formData.get('website_hp') as string;
  if (honeypot) {
    return {
      success: true,
      message: '¡Solicitud Recibida!',
    };
  }

  const name = ((formData.get('name') as string) || '').trim();
  const email = ((formData.get('email') as string) || '').trim();
  const company = ((formData.get('company') as string) || '').trim();
  const phone = ((formData.get('phone') as string) || '').trim();
  const service = ((formData.get('service') as string) || '').trim();
  const projectSize = ((formData.get('projectSize') as string) || '').trim();
  const budget = ((formData.get('budget') as string) || '').trim();
  const message = ((formData.get('message') as string) || '').trim();

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = 'Por favor ingresa tu nombre completo.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Por favor ingresa un correo electrónico válido.';
  }

  if (!service) {
    errors.service = 'Por favor selecciona un servicio de interés.';
  }

  if (!message || message.length < 10) {
    errors.message = 'Por favor describe tu proyecto (mínimo 10 caracteres).';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Por favor corrige los errores señalados.',
      errors,
    };
  }

  const waText = `*Solicitud de Cotización Técnica - Nexos Ingeniería*\n\n*Nombre:* ${name}\n*Email:* ${email}${phone ? `\n*Teléfono:* ${phone}` : ''}${company ? `\n*Empresa:* ${company}` : ''}\n*Servicio:* ${service}${projectSize ? `\n*Dimensión:* ${projectSize}` : ''}${budget ? `\n*Presupuesto:* ${budget}` : ''}\n\n*Detalles del Proyecto:*\n${message}`;
  const whatsappUrl = buildWhatsAppLink(waText);

  try {
    const emailResult = await sendEmail({
      name,
      email,
      company,
      phone,
      service,
      projectSize,
      budget,
      message,
      page: 'Cotizar',
    });

    if (!emailResult.success) {
      return {
        success: false,
        message: emailResult.message,
        whatsappUrl,
      };
    }

    return {
      success: true,
      message:
        '¡Solicitud de cotización recibida! Un especialista técnico analizará tus requerimientos y se contactará en menos de 48 horas.',
    };
  } catch (error) {
    console.error('[Form Handler Error] processQuoteForm:', error);
    return {
      success: false,
      message:
        'Ocurrió una interrupción al enviar la cotización. Podés enviarla directamente por WhatsApp con un solo clic.',
      whatsappUrl,
    };
  }
}

export async function processNewsletterForm(formData: FormData): Promise<FormResponse> {
  const honeypot = formData.get('website_hp') as string;
  if (honeypot) {
    return { success: true, message: '¡Gracias por suscribirte!' };
  }

  const email = ((formData.get('email') as string) || '').trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: 'Por favor ingresa un correo electrónico válido.',
    };
  }

  const waText = `*Suscripción a Boletín Técnico - Nexos Ingeniería*\n\n*Email:* ${email}`;
  const whatsappUrl = buildWhatsAppLink(waText);

  try {
    const result = await sendEmail({ email, page: 'Newsletter' });
    if (!result.success) {
      return {
        success: false,
        message: result.message || 'Error al suscribirte.',
        whatsappUrl,
      };
    }
    return { success: true, message: '¡Gracias por suscribirte a nuestro boletín técnico!' };
  } catch (error) {
    console.error('[Form Handler Error] processNewsletterForm:', error);
    return {
      success: false,
      message: 'Ocurrió un error al procesar tu suscripción.',
      whatsappUrl,
    };
  }
}

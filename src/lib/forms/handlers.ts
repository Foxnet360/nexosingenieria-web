import { sendEmail } from '@/lib/emailjs';

export interface FormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
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
        message: emailResult.message || 'Ocurrió un error al enviar el mensaje. Intenta de nuevo.',
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
      message: 'Ocurrió un error inesperado al procesar tu solicitud. Por favor intenta de nuevo.',
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
        message: emailResult.message || 'Ocurrió un error al enviar la cotización.',
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
      message: 'Ocurrió un error inesperado al procesar la cotización. Por favor intenta de nuevo.',
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

  try {
    const result = await sendEmail({ email, page: 'Newsletter' });
    if (!result.success) {
      return { success: false, message: result.message || 'Error al suscribirte.' };
    }
    return { success: true, message: '¡Gracias por suscribirte a nuestro boletín técnico!' };
  } catch (error) {
    console.error('[Form Handler Error] processNewsletterForm:', error);
    return { success: false, message: 'Ocurrió un error al procesar tu suscripción.' };
  }
}

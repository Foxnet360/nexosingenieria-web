import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/email/mailer';
import { ContactFormData } from '@/lib/email/templates';

export async function POST(request: Request) {
  try {
    let payload: Record<string, string> = {};

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      payload = await request.json();
    } else if (
      contentType.includes('multipart/form-data') ||
      contentType.includes('application/x-www-form-urlencoded')
    ) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        if (typeof value === 'string') {
          payload[key] = value;
        }
      });
    }

    // Honeypot check for bots
    if (payload.website_hp) {
      return NextResponse.json({
        success: true,
        message: '¡Mensaje Enviado!',
      });
    }

    const email = (payload.email || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Por favor ingresa un correo electrónico válido.',
        },
        { status: 400 }
      );
    }

    const contactData: ContactFormData = {
      name: (payload.name || '').trim(),
      email,
      phone: (payload.phone || '').trim(),
      company: (payload.company || '').trim(),
      service: (payload.service || '').trim(),
      projectSize: (payload.projectSize || '').trim(),
      budget: (payload.budget || '').trim(),
      message: (payload.message || '').trim(),
      page: (payload.page || 'Contacto').trim(),
    };

    const result = await sendContactEmails(contactData);

    return NextResponse.json(result, {
      status: result.success ? 200 : result.configured ? 500 : 200,
    });
  } catch (error) {
    console.error('[API contact error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Ocurrió un error en el servidor al procesar la solicitud.',
      },
      { status: 500 }
    );
  }
}

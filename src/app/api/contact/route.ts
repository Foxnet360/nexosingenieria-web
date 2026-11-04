import { NextResponse } from 'next/server';
import { sendContactEmails } from '@/lib/email/mailer';
import { ContactFormData } from '@/lib/email/templates';
import { saveLead, updateLeadEmailStatus } from '@/lib/leads/repository';

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

    // Extract client IP and User-Agent for audit & spam protection
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    // 1. Persistent Storage First (Zero Lead Loss)
    const leadResult = await saveLead(contactData, { ip, userAgent });

    // 2. Dispatch Email Notifications via SMTP
    const emailResult = await sendContactEmails(contactData);

    // 3. Update Email Delivery Status in DB
    if (leadResult.id) {
      await updateLeadEmailStatus(
        leadResult.id,
        emailResult.success ? 'sent' : 'failed',
        emailResult.success ? undefined : emailResult.message
      );
    }

    // If email succeeded, return standard success
    if (emailResult.success) {
      return NextResponse.json(emailResult, { status: 200 });
    }

    // If email failed but lead was safely saved in PostgreSQL, protect UX and confirm lead receipt
    if (leadResult.success) {
      return NextResponse.json(
        {
          success: true,
          configured: emailResult.configured,
          message:
            '¡Tu solicitud ha sido recibida y registrada exitosamente! Nuestro equipo técnico te responderá a la brevedad.',
        },
        { status: 200 }
      );
    }

    // Both email and DB persistence failed
    return NextResponse.json(emailResult, {
      status: emailResult.configured ? 500 : 200,
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

import fs from 'fs';
import path from 'path';

export interface AutoresponderTemplate {
  id: string;
  name: string;
  subject: string;
  category: 'contacto' | 'cotizar' | 'newsletter' | 'general';
  description: string;
  bodyHtml: string;
  variables: string[];
  active: boolean;
  updatedAt: string;
}

const TEMPLATES_FILE = path.join(process.cwd(), 'src/data/autoresponder-templates.json');

const DEFAULT_TEMPLATES: AutoresponderTemplate[] = [
  {
    id: 'contacto-default',
    name: 'Confirmación de Contacto General',
    subject: 'Hemos recibido tu solicitud | Nexos Ingeniería SAS',
    category: 'contacto',
    description:
      'Enviado automáticamente cuando un cliente llena el formulario principal de contacto.',
    bodyHtml: `
<p>Hola <strong>{{name}}</strong>,</p>
<p>Gracias por contactarte con el equipo de <strong>Nexos Ingeniería SAS</strong>. Hemos recibido tu requerimiento sobre <em>{{service}}</em> con radicado exitoso.</p>
<p>Un ingeniero especialista de nuestro equipo revisará tus requerimientos y te contactará en un plazo máximo de <strong>24 horas hábiles</strong>.</p>
<hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;"/>
<p style="font-size:13px;color:#6b7280;">Nexos Ingeniería SAS — Especialistas en Redes, Seguridad Electrónica y Automatización Corporativa.</p>
    `.trim(),
    variables: ['name', 'service', 'company', 'email', 'date'],
    active: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cotizar-default',
    name: 'Recepción de Solicitud de Cotización',
    subject: 'Tu cotización técnica está en análisis | Nexos Ingeniería SAS',
    category: 'cotizar',
    description:
      'Enviado a prospectos que envían presupuesto y requerimiento de proyecto desde /cotizar.',
    bodyHtml: `
<p>Estimado(a) <strong>{{name}}</strong>,</p>
<p>Confirmamos la recepción de tu solicitud de cotización para el proyecto de <strong>{{service}}</strong>.</p>
<p>Nuestro departamento de ingeniería y licitaciones se encuentra evaluando el alcance y la viabilidad técnica para preparar una propuesta de valor a la medida de tu presupuesto estimado.</p>
<p>Si requieres adjuntar planos técnicos o agendar una visita preliminar, por favor responde directamente a este correo.</p>
<br/>
<p>Atentamente,<br/><strong>Equipo Comercial y de Ingeniería</strong><br/>Nexos Ingeniería SAS</p>
    `.trim(),
    variables: ['name', 'service', 'budget', 'projectSize', 'company'],
    active: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'newsletter-welcome',
    name: 'Bienvenida a Boletín Tecnológico',
    subject: 'Bienvenido al boletín de ingeniería y telecomunicaciones | Nexos',
    category: 'newsletter',
    description: 'Mensaje de bienvenida para suscriptores al newsletter tecnológico.',
    bodyHtml: `
<p>¡Gracias por unirte a la comunidad de <strong>Nexos Ingeniería</strong>!</p>
<p>Periódicamente recibirás guías técnicas exclusivas, análisis de normativas (RETIE, ANSI/TIA, NFPA) y casos de estudio reales sobre automatización BMS y centros de datos en Colombia.</p>
<p>Puedes acceder en cualquier momento a nuestros artículos en nuestro <a href="https://nexosingenieria.com/blog">Blog de Ingeniería</a>.</p>
    `.trim(),
    variables: ['email'],
    active: true,
    updatedAt: new Date().toISOString(),
  },
];

export function getAutoresponderTemplates(): AutoresponderTemplate[] {
  try {
    if (fs.existsSync(TEMPLATES_FILE)) {
      const data = fs.readFileSync(TEMPLATES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading autoresponder templates:', err);
  }
  return DEFAULT_TEMPLATES;
}

export function saveAutoresponderTemplates(templates: AutoresponderTemplate[]): boolean {
  try {
    const dir = path.dirname(TEMPLATES_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(templates, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving autoresponder templates:', err);
    return false;
  }
}

export function updateTemplate(updated: AutoresponderTemplate): boolean {
  const templates = getAutoresponderTemplates();
  const index = templates.findIndex(t => t.id === updated.id);
  if (index >= 0) {
    templates[index] = { ...updated, updatedAt: new Date().toISOString() };
  } else {
    templates.push({ ...updated, updatedAt: new Date().toISOString() });
  }
  return saveAutoresponderTemplates(templates);
}

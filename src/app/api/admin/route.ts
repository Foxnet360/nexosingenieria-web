import { NextResponse } from 'next/server';
import { generateAdminToken, getAdminPassword, verifyAdminToken } from '@/lib/admin/auth';
import { getAllLeads, deleteLead } from '@/lib/leads/repository';
import {
  getAutoresponderTemplates,
  updateTemplate,
  AutoresponderTemplate,
} from '@/lib/admin/templates';
import { getAllBlogPosts } from '@/data/blog';
import { getAllProjects } from '@/data/projects';

function isAuthorized(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/nexos_admin_session=([^;]+)/);
  if (!match) return false;
  const token = match[1];
  return verifyAdminToken(token) !== null;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get('resource') || 'summary';

  try {
    if (resource === 'leads') {
      const leads = await getAllLeads(150);
      return NextResponse.json({ success: true, leads });
    }

    if (resource === 'templates') {
      const templates = getAutoresponderTemplates();
      return NextResponse.json({ success: true, templates });
    }

    if (resource === 'blog') {
      const posts = getAllBlogPosts();
      return NextResponse.json({ success: true, posts });
    }

    if (resource === 'projects') {
      const projects = getAllProjects();
      return NextResponse.json({ success: true, projects });
    }

    // Default: summary metrics
    const [leads, templates, posts, projects] = await Promise.all([
      getAllLeads(50),
      Promise.resolve(getAutoresponderTemplates()),
      Promise.resolve(getAllBlogPosts()),
      Promise.resolve(getAllProjects()),
    ]);

    const sentLeadsCount = leads.filter(l => l.email_status === 'sent').length;
    const pendingLeadsCount = leads.filter(l => l.email_status === 'pending').length;

    return NextResponse.json({
      authenticated: true,
      stats: {
        totalLeads: leads.length,
        sentLeads: sentLeadsCount,
        pendingLeads: pendingLeadsCount,
        activeTemplates: templates.filter(t => t.active).length,
        totalPosts: posts.length,
        totalProjects: projects.length,
      },
      recentLeads: leads.slice(0, 5),
    });
  } catch (err) {
    console.error('[Admin API GET Error]:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Login action
    if (body.action === 'login') {
      const password = body.password;
      const expectedPassword = getAdminPassword();

      if (password === expectedPassword) {
        const token = generateAdminToken();
        const response = NextResponse.json({ success: true, message: 'Autenticación exitosa' });
        response.cookies.set('nexos_admin_session', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        });
        return response;
      }
      return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // 2. Logout action
    if (body.action === 'logout') {
      const response = NextResponse.json({ success: true });
      response.cookies.delete('nexos_admin_session');
      return response;
    }

    // All subsequent actions require authentication
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 3. Save template
    if (body.action === 'save_template') {
      const template: AutoresponderTemplate = body.template;
      if (!template || !template.id || !template.name) {
        return NextResponse.json({ error: 'Datos de plantilla incompletos' }, { status: 400 });
      }
      const ok = updateTemplate(template);
      return NextResponse.json({ success: ok });
    }

    // 4. Delete lead
    if (body.action === 'delete_lead') {
      const id = body.id;
      if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
      const ok = await deleteLead(id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ error: 'Acción no soportada' }, { status: 400 });
  } catch (err) {
    console.error('[Admin API POST Error]:', err);
    return NextResponse.json({ error: 'Error procesando solicitud' }, { status: 500 });
  }
}

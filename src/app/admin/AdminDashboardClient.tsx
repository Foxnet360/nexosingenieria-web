'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Users,
  EnvelopeSimple,
  Article,
  Briefcase,
  LockKey,
  SignOut,
  CheckCircle,
  WarningCircle,
  Trash,
  FloppyDisk,
  Eye,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import { StoredLead } from '@/lib/leads/repository';
import { AutoresponderTemplate } from '@/lib/admin/templates';
import { BlogPost } from '@/data/blog';
import { ProjectDetail } from '@/data/projects';

type Tab = 'overview' | 'leads' | 'templates' | 'blog' | 'projects';

interface AdminStats {
  totalLeads: number;
  sentLeads: number;
  pendingLeads: number;
  activeTemplates: number;
  totalPosts: number;
  totalProjects: number;
}

export default function AdminDashboardClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [leads, setLeads] = useState<StoredLead[]>([]);
  const [templates, setTemplates] = useState<AutoresponderTemplate[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<ProjectDetail[]>([]);

  // Editing state for templates
  const [selectedTemplate, setSelectedTemplate] = useState<AutoresponderTemplate | null>(null);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const checkAuthAndLoad = useCallback(async () => {
    try {
      const res = await fetch('/api/admin?resource=summary');
      if (res.status === 401) {
        setIsAuthenticated(false);
      } else {
        const data = await res.json();
        setIsAuthenticated(true);
        setStats(data.stats);
        if (data.recentLeads) {
          setLeads(data.recentLeads);
        }
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      try {
        const res = await fetch('/api/admin?resource=summary');
        if (!isMounted) return;
        if (res.status === 401) {
          setIsAuthenticated(false);
        } else {
          const data = await res.json();
          if (!isMounted) return;
          setIsAuthenticated(true);
          setStats(data.stats);
          if (data.recentLeads) {
            setLeads(data.recentLeads);
          }
        }
      } catch {
        if (isMounted) setIsAuthenticated(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void init();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        void checkAuthAndLoad();
      } else {
        setLoginError(data.error || 'Credenciales incorrectas');
      }
    } catch {
      setLoginError('Error de red al intentar autenticar');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    setIsAuthenticated(false);
    setPassword('');
  };

  const loadTabData = async (tab: Tab) => {
    setActiveTab(tab);
    setLoading(true);
    try {
      if (tab === 'leads') {
        const res = await fetch('/api/admin?resource=leads');
        const data = await res.json();
        if (data.leads) setLeads(data.leads);
      } else if (tab === 'templates') {
        const res = await fetch('/api/admin?resource=templates');
        const data = await res.json();
        if (data.templates) {
          setTemplates(data.templates);
          setSelectedTemplate(data.templates[0] || null);
        }
      } else if (tab === 'blog') {
        const res = await fetch('/api/admin?resource=blog');
        const data = await res.json();
        if (data.posts) setBlogPosts(data.posts);
      } else if (tab === 'projects') {
        const res = await fetch('/api/admin?resource=projects');
        const data = await res.json();
        if (data.projects) setProjects(data.projects);
      }
    } catch (err) {
      console.error('Error fetching tab data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('¿Deseas eliminar este lead definitivamente?')) return;
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_lead', id }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    } catch {
      alert('Error eliminando lead');
    }
  };

  const handleSaveTemplate = async () => {
    if (!selectedTemplate) return;
    setIsSavingTemplate(true);
    setSaveSuccessMsg('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_template', template: selectedTemplate }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccessMsg('Plantilla actualizada y guardada correctamente.');
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    } catch {
      alert('Error guardando plantilla');
    } finally {
      setIsSavingTemplate(false);
    }
  };

  // 1. Loading state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <ArrowsClockwise className="animate-spin text-cyan-400 mr-2" size={24} />
        Cargando consola de administración...
      </div>
    );
  }

  // 2. Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <LockKey size={32} weight="duotone" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Panel Administrativo</h1>
          <p className="text-slate-400 text-sm text-center mb-6">
            Ingreso privado restringido a personal de Nexos Ingeniería.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Clave de Seguridad
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs flex items-center">
                <WarningCircle size={18} className="mr-2 shrink-0" />
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {isLoggingIn ? 'Verificando...' : 'Acceder al Panel'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Authenticated Dashboard View
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <LockKey size={22} weight="duotone" />
            </div>
            <div>
              <div className="font-bold text-white leading-tight">Nexos Admin</div>
              <div className="text-xs text-slate-400">Consola Central</div>
            </div>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users size={18} />
              <span>Resumen General</span>
            </button>

            <button
              onClick={() => loadTabData('leads')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'leads'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users size={18} />
              <span>Prospectos / Leads</span>
            </button>

            <button
              onClick={() => loadTabData('templates')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'templates'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <EnvelopeSimple size={18} />
              <span>Autorespondedor</span>
            </button>

            <button
              onClick={() => loadTabData('blog')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'blog'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Article size={18} />
              <span>Blog & Artículos</span>
            </button>

            <button
              onClick={() => loadTabData('projects')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                activeTab === 'projects'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Briefcase size={18} />
              <span>Casos de Éxito</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition"
          >
            <SignOut size={18} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {/* Top bar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">
              {activeTab === 'overview' && 'Resumen Operativo'}
              {activeTab === 'leads' && 'Gestión de Leads & Cotizaciones'}
              {activeTab === 'templates' && 'Plantillas de Autoresponder'}
              {activeTab === 'blog' && 'Contenido de Blog'}
              {activeTab === 'projects' && 'Portafolio de Proyectos'}
            </h2>
            <p className="text-sm text-slate-400">
              Panel interno sincronizado con base de datos PostgreSQL de Nexos.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
              Sistema Activo
            </span>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Total Leads
                </div>
                <div className="text-3xl font-extrabold text-white">{stats?.totalLeads ?? 0}</div>
                <div className="text-xs text-slate-500 mt-2">Registrados en base de datos</div>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Emails Enviados
                </div>
                <div className="text-3xl font-extrabold text-cyan-400">{stats?.sentLeads ?? 0}</div>
                <div className="text-xs text-slate-500 mt-2">Notificaciones despachadas</div>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Artículos Blog
                </div>
                <div className="text-3xl font-extrabold text-purple-400">
                  {stats?.totalPosts ?? 5}
                </div>
                <div className="text-xs text-slate-500 mt-2">Optimizados para SEO & LLMs</div>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">
                  Proyectos Activos
                </div>
                <div className="text-3xl font-extrabold text-emerald-400">
                  {stats?.totalProjects ?? 12}
                </div>
                <div className="text-xs text-slate-500 mt-2">Casos reales con fichas técnicas</div>
              </div>
            </div>

            {/* Recent Leads list */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Últimos Prospectos Radicados</h3>
                <button
                  onClick={() => loadTabData('leads')}
                  className="text-xs text-cyan-400 hover:underline"
                >
                  Ver todos los leads &rarr;
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No hay prospectos recientes registrados en la base de datos o el pool está
                  desconectado.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 text-xs">
                        <th className="pb-3 font-semibold">Cliente / Empresa</th>
                        <th className="pb-3 font-semibold">Email</th>
                        <th className="pb-3 font-semibold">Servicio</th>
                        <th className="pb-3 font-semibold">Origen</th>
                        <th className="pb-3 font-semibold">Estado Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-slate-800/30">
                          <td className="py-3 font-medium text-white">
                            {lead.name || 'Sin nombre'}
                            {lead.company && (
                              <span className="block text-xs text-slate-400">{lead.company}</span>
                            )}
                          </td>
                          <td className="py-3 text-cyan-400">{lead.email}</td>
                          <td className="py-3 text-slate-300">{lead.service || 'General'}</td>
                          <td className="py-3 text-slate-400 text-xs">{lead.page}</td>
                          <td className="py-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                lead.email_status === 'sent'
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : lead.email_status === 'failed'
                                    ? 'bg-rose-500/10 text-rose-400'
                                    : 'bg-amber-500/10 text-amber-400'
                              }`}
                            >
                              {lead.email_status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Leads Management */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-400">
                Mostrando {leads.length} prospectos recibidos a través de los formularios.
              </p>
              <button
                onClick={() => loadTabData('leads')}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl text-white transition"
              >
                <ArrowsClockwise size={16} />
                <span>Actualizar Datos</span>
              </button>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500">
                <ArrowsClockwise className="animate-spin inline mr-2 text-cyan-400" size={20} />
                Cargando leads desde PostgreSQL...
              </div>
            ) : leads.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
                No hay prospectos registrados aún. Cuando un usuario use el formulario de contacto o
                cotización, aparecerán aquí.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {leads.map(lead => (
                  <div
                    key={lead.id}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-slate-800">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {lead.name || 'Sin nombre proporcionado'}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="text-cyan-400 font-medium">{lead.email}</span>
                          {lead.phone && <span>• Tel: {lead.phone}</span>}
                          {lead.company && <span>• Empresa: {lead.company}</span>}
                          <span>• Página: {lead.page}</span>
                          <span>• Fecha: {new Date(lead.created_at).toLocaleString('es-CO')}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            lead.email_status === 'sent'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          Email: {lead.email_status}
                        </span>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-2 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition"
                          title="Eliminar lead"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <span className="text-slate-500 block mb-1">Servicio Solicitado</span>
                        <span className="font-semibold text-white">
                          {lead.service || 'No especificado'}
                        </span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <span className="text-slate-500 block mb-1">Tamaño del Proyecto</span>
                        <span className="font-semibold text-white">
                          {lead.project_size || 'No especificado'}
                        </span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                        <span className="text-slate-500 block mb-1">Presupuesto Estimado</span>
                        <span className="font-semibold text-white">
                          {lead.budget || 'No especificado'}
                        </span>
                      </div>
                    </div>

                    {lead.message && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-sm text-slate-300">
                        <span className="text-xs text-slate-500 block mb-1 font-semibold uppercase">
                          Mensaje del Cliente:
                        </span>
                        {lead.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Templates */}
        {activeTab === 'templates' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List of templates */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Plantillas Disponibles
              </h3>
              {templates.map(tpl => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    selectedTemplate?.id === tpl.id
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{tpl.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        tpl.active
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">{tpl.description}</p>
                </div>
              ))}
            </div>

            {/* Template Editor */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
              {selectedTemplate ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Editar Plantilla</h3>
                      <p className="text-xs text-slate-400">
                        Variables disponibles:{' '}
                        {selectedTemplate.variables.map(v => `{{${v}}}`).join(', ')}
                      </p>
                    </div>
                    <button
                      onClick={handleSaveTemplate}
                      disabled={isSavingTemplate}
                      className="flex items-center space-x-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition disabled:opacity-50"
                    >
                      <FloppyDisk size={16} />
                      <span>{isSavingTemplate ? 'Guardando...' : 'Guardar Cambios'}</span>
                    </button>
                  </div>

                  {saveSuccessMsg && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center">
                      <CheckCircle size={18} className="mr-2" />
                      {saveSuccessMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Nombre de la plantilla
                    </label>
                    <input
                      type="text"
                      value={selectedTemplate.name}
                      onChange={e =>
                        setSelectedTemplate({ ...selectedTemplate, name: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Asunto del Correo (Subject)
                    </label>
                    <input
                      type="text"
                      value={selectedTemplate.subject}
                      onChange={e =>
                        setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">
                      Cuerpo del Correo (HTML soportado)
                    </label>
                    <textarea
                      rows={10}
                      value={selectedTemplate.bodyHtml}
                      onChange={e =>
                        setSelectedTemplate({ ...selectedTemplate, bodyHtml: e.target.value })
                      }
                      className="w-full font-mono text-xs p-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="pt-2">
                    <span className="block text-xs font-semibold text-slate-400 mb-2">
                      Vista previa renderizada:
                    </span>
                    <div
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-sm prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedTemplate.bodyHtml }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  Selecciona una plantilla del listado para editar su contenido.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Blog Posts overview */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-400">
                Mostrando {blogPosts.length} artículos técnicos indexados en el blog.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blogPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-semibold">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">{post.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-3 mb-4">
                      {post.excerpt || 'Artículo técnico especializado para ingeniería y empresas.'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">Por {post.author.name}</span>
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline flex items-center space-x-1"
                    >
                      <Eye size={14} className="mr-1" />
                      Ver artículo en vivo
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-slate-400">
                Mostrando {projects.length} proyectos con especificaciones técnicas completas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition"
                >
                  <div>
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                      {proj.industry} • {proj.year}
                    </span>
                    <h3 className="text-base font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-xs text-slate-400 mb-3">{proj.client}</p>
                    <p className="text-xs text-slate-300 line-clamp-3 mb-4">{proj.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800">
                    <span className="text-[11px] text-slate-500 block mb-2">Servicios clave:</span>
                    <div className="flex flex-wrap gap-1">
                      {proj.services.slice(0, 3).map((srv, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

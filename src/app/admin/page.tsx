import { Metadata } from 'next';
import AdminDashboardClient from './AdminDashboardClient';

export const metadata: Metadata = {
  title: 'Panel de Administración | Nexos Ingeniería',
  description: 'Gestión interna de leads, autoresponder, publicaciones y proyectos.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}

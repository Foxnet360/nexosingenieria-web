import { ServiceSchema } from '@/components/schema/OrganizationSchema';

export default function SolucionesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema
        name="Servicios de Integración Tecnológica - Nexos Ingeniería SAS"
        description="Soluciones integrales de cableado estructurado, seguridad electrónica, centros de datos, automatización, control de acceso y mantenimiento."
      />
      {children}
    </>
  );
}

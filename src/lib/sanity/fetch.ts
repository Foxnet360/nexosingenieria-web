import { client, projectId } from './client';
import { serviciosData, proyectosData, empresaData, contactoData } from '@/data/scraped-content';

const isSanityConfigured =
  Boolean(projectId) && projectId !== 'your-project-id' && projectId !== 'undefined';

/**
 * Safely executes a GROQ query to Sanity with fallback data if Sanity is not configured or unavailable.
 */
export async function safeSanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallbackData: T
): Promise<T> {
  if (!isSanityConfigured) {
    return fallbackData;
  }

  try {
    const data = await client.fetch<T>(query, params);
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return fallbackData;
    }
    return data;
  } catch (error) {
    console.warn('[Sanity Fetch Warning] Falling back to static data:', error);
    return fallbackData;
  }
}

/**
 * Fallback static adapters formatted to match GROQ query outputs
 */
export const staticFallbacks = {
  services: serviciosData.map(s => ({
    _id: s.id,
    title: s.titulo,
    slug: { current: s.id },
    description: s.descripcion,
    shortDescription: s.descripcionCorta,
    features: s.subservicios,
    icon: s.id,
    isPillar: true,
  })),
  projects: proyectosData.map(p => ({
    _id: p.id,
    title: p.alt,
    slug: { current: p.id },
    coverImage: p.localPath,
    client: 'Cliente Nexos',
    industry: 'Infraestructura Tecnológica',
  })),
  company: empresaData,
  contact: contactoData,
};

import { getDbPool, ensureDatabaseSchema } from '@/lib/db';
import { LeadInput, LeadMetadata, SaveLeadResult } from './types';

/**
 * Persists an incoming lead into PostgreSQL.
 * If database is not configured (e.g. local dev without DB), it logs and returns gracefully.
 */
export async function saveLead(input: LeadInput, metadata?: LeadMetadata): Promise<SaveLeadResult> {
  const db = getDbPool();

  if (!db) {
    return {
      success: false,
      error: 'DATABASE_NOT_CONFIGURED',
    };
  }

  try {
    await ensureDatabaseSchema();

    const query = `
      INSERT INTO contact_leads (
        name,
        email,
        phone,
        company,
        service,
        project_size,
        budget,
        message,
        page,
        ip_address,
        user_agent
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id;
    `;

    const values = [
      input.name || null,
      input.email,
      input.phone || null,
      input.company || null,
      input.service || null,
      input.projectSize || null,
      input.budget || null,
      input.message || null,
      input.page || 'Contacto',
      metadata?.ip || null,
      metadata?.userAgent || null,
    ];

    const result = await db.query(query, values);
    const id = result.rows[0]?.id;

    return {
      success: true,
      id,
    };
  } catch (error) {
    console.error('[Lead Repository Error] saveLead failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };
  }
}

/**
 * Updates the email delivery status of an existing lead.
 */
export async function updateLeadEmailStatus(
  id: string,
  status: 'sent' | 'failed',
  error?: string
): Promise<void> {
  const db = getDbPool();
  if (!db || !id) return;

  try {
    const query = `
      UPDATE contact_leads
      SET 
        email_status = $1,
        email_error = $2,
        updated_at = NOW()
      WHERE id = $3;
    `;

    await db.query(query, [status, error || null, id]);
  } catch (err) {
    console.error(`[Lead Repository Error] updateLeadEmailStatus failed for ${id}:`, err);
  }
}

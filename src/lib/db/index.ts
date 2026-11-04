import { Pool, PoolConfig } from 'pg';

let pool: Pool | null = null;
let initialized = false;

export function getDbPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Database] DATABASE_URL is not set. Database persistence is skipped.');
    }
    return null;
  }

  if (!pool) {
    const isSsl =
      connectionString.includes('sslmode=require') ||
      connectionString.includes('railway') ||
      process.env.NODE_ENV === 'production';

    const config: PoolConfig = {
      connectionString,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    };

    if (isSsl) {
      config.ssl = {
        rejectUnauthorized: false, // Allows connection across Railway private/public SSL
      };
    }

    pool = new Pool(config);

    pool.on('error', err => {
      console.error('[Database Pool Error]:', err);
    });
  }

  return pool;
}

/**
 * Ensures table and indexes exist on the active database.
 * Runs once upon first DB call.
 */
export async function ensureDatabaseSchema(): Promise<void> {
  if (initialized) return;

  const db = getDbPool();
  if (!db) return;

  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS contact_leads (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          page VARCHAR(50) NOT NULL DEFAULT 'Contacto',
          name VARCHAR(255),
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(255),
          service VARCHAR(255),
          project_size VARCHAR(100),
          budget VARCHAR(100),
          message TEXT,
          email_status VARCHAR(20) NOT NULL DEFAULT 'pending',
          email_error TEXT,
          ip_address VARCHAR(100),
          user_agent TEXT
      );

      CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads(email);
      CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_contact_leads_email_status ON contact_leads(email_status);
      CREATE INDEX IF NOT EXISTS idx_contact_leads_page ON contact_leads(page);
    `);
    initialized = true;
  } catch (error) {
    console.error('[Database Schema Init Error]:', error);
  }
}

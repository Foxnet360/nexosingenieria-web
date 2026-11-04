import { NextResponse } from 'next/server';
import { getDbPool, ensureDatabaseSchema } from '@/lib/db';

export async function GET() {
  const db = getDbPool();
  if (!db) {
    return NextResponse.json({ status: 'no_db' }, { status: 500 });
  }

  try {
    await ensureDatabaseSchema();
    const result = await db.query('SELECT count(*)::int as count FROM contact_leads');
    const recent = await db.query(
      'SELECT id, created_at, email, name, email_status FROM contact_leads ORDER BY created_at DESC LIMIT 5'
    );
    return NextResponse.json({ status: 'ok', count: result.rows[0].count, recent: recent.rows });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}

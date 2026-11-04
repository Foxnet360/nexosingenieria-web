import { NextResponse } from 'next/server';
import { getDbPool } from '@/lib/db';

export async function GET() {
  const db = getDbPool();
  if (!db) {
    return NextResponse.json(
      { status: 'error', message: 'DATABASE_URL is not set or pool failed' },
      { status: 500 }
    );
  }

  try {
    const result = await db.query('SELECT NOW() as now, current_database() as db');
    return NextResponse.json({ status: 'ok', data: result.rows[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json({ status: 'db_error', message }, { status: 500 });
  }
}

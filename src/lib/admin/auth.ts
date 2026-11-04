import crypto from 'crypto';

export interface AdminPayload {
  user: string;
  exp: number;
}

const DEFAULT_SECRET =
  process.env.ADMIN_SESSION_SECRET || 'nexos-ingenieria-secure-admin-secret-key-production';

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'NexosAdmin2026*!';
}

export function generateAdminToken(
  user: string = 'admin',
  secret: string = DEFAULT_SECRET
): string {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload: AdminPayload = { user, exp };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(encodedPayload).digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(
  token: string,
  secret: string = DEFAULT_SECRET
): AdminPayload | null {
  try {
    const [encodedPayload, signature] = token.split('.');
    if (!encodedPayload || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(encodedPayload)
      .digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload: AdminPayload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    );
    if (Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

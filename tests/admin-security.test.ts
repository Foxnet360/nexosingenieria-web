import { describe, it } from 'node:test';
import assert from 'node:assert';
import { generateAdminToken, verifyAdminToken } from '../src/lib/admin/auth.ts';

describe('Admin Security & Auth Module', () => {
  const secret = 'test-secret-key-12345678901234567890';

  it('should sign and verify valid session token', () => {
    const token = generateAdminToken('admin', secret);
    assert.ok(token);
    const verified = verifyAdminToken(token, secret);
    assert.strictEqual(verified?.user, 'admin');
  });

  it('should reject tampered token', () => {
    const token = generateAdminToken('admin', secret);
    const tampered = token + 'manipulated';
    const verified = verifyAdminToken(tampered, secret);
    assert.strictEqual(verified, null);
  });

  it('should reject invalid secret', () => {
    const token = generateAdminToken('admin', secret);
    const verified = verifyAdminToken(token, 'different-secret');
    assert.strictEqual(verified, null);
  });
});

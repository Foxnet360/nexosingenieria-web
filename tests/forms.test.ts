import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  buildWhatsAppLink,
  processContactForm,
  processQuoteForm,
  processNewsletterForm,
} from '../src/lib/forms/handlers.ts';

describe('Form Logic & Anti-Spam Protections', () => {
  it('should generate valid WhatsApp redirection URLs with encoded text', () => {
    const link = buildWhatsAppLink('Hola Nexos, quiero cotizar');
    assert.ok(link.startsWith('https://wa.me/573155089404?text='));
    assert.ok(link.includes('Hola%20Nexos'));
  });

  it('should silently discard spam bots via honeypot field', async () => {
    const formData = new FormData();
    formData.append('website_hp', 'http://spambot-link.com');
    formData.append('name', 'Bot spammer');
    formData.append('email', 'bot@spam.com');

    const result = await processContactForm(formData);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.message, '¡Mensaje Enviado!');
  });

  it('should validate invalid contact submissions and return descriptive errors', async () => {
    const formData = new FormData();
    formData.append('name', 'A'); // Too short
    formData.append('email', 'not-an-email');
    formData.append('message', 'Short'); // Under 10 chars

    const result = await processContactForm(formData);
    assert.strictEqual(result.success, false);
    assert.ok(result.errors);
    assert.ok(result.errors.name);
    assert.ok(result.errors.email);
    assert.ok(result.errors.message);
  });

  it('should reject invalid quote forms when service is missing', async () => {
    const formData = new FormData();
    formData.append('name', 'Diego Toro');
    formData.append('email', 'diego@empresa.com');
    formData.append('message', 'Necesitamos cableado estructurado para 4 pisos');
    // service is intentionally omitted

    const result = await processQuoteForm(formData);
    assert.strictEqual(result.success, false);
    assert.ok(result.errors);
    assert.ok(result.errors.service);
  });

  it('should validate newsletter email address', async () => {
    const invalidForm = new FormData();
    invalidForm.append('email', 'invalid-format');

    const result = await processNewsletterForm(invalidForm);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.message, 'Por favor ingresa un correo electrónico válido.');
  });
});

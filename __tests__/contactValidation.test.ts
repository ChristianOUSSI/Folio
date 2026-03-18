import { validateContactForm } from '@/lib/contactValidation';

describe('Contact Form Validation', () => {
  test('should validate correct contact data', () => {
    const data = {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      message: 'This is a test message with at least 10 characters',
      csrfToken: 'test-token-123',
    };

    const result = validateContactForm(data);
    expect(result.success).toBe(true);
  });

  test('should reject short name', () => {
    const data = {
      name: 'J',
      email: 'jean@example.com',
      message: 'This is a test message',
      csrfToken: 'test-token-123',
    };

    const result = validateContactForm(data);
    expect(result.success).toBe(false);
  });

  test('should reject invalid email', () => {
    const data = {
      name: 'Jean Dupont',
      email: 'invalid-email',
      message: 'This is a test message',
      csrfToken: 'test-token-123',
    };

    const result = validateContactForm(data);
    expect(result.success).toBe(false);
  });

  test('should reject short message', () => {
    const data = {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      message: 'Short',
      csrfToken: 'test-token-123',
    };

    const result = validateContactForm(data);
    expect(result.success).toBe(false);
  });

  test('should reject missing CSRF token', () => {
    const data = {
      name: 'Jean Dupont',
      email: 'jean@example.com',
      message: 'This is a test message',
      csrfToken: '',
    };

    const result = validateContactForm(data);
    expect(result.success).toBe(false);
  });
});

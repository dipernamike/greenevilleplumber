import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the AWS SDK
vi.mock('@aws-sdk/client-ses', () => ({
  SESClient: vi.fn().mockImplementation(() => ({
    send: vi.fn().mockResolvedValue({}),
  })),
  SendEmailCommand: vi.fn(),
}));

// Import handler after mocking
const createHandler = async () => {
  const module = await import('../lambda/contact.js');
  return module.handler;
};

describe('Contact Form Lambda', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.FROM_EMAIL = 'test@example.com';
    process.env.TO_EMAIL = 'recipient@example.com';
  });

  describe('CORS', () => {
    it('should handle OPTIONS preflight request', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'OPTIONS',
        headers: { origin: 'https://greenevilleplumber.com' },
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
      expect(response.headers['Access-Control-Allow-Methods']).toContain('POST');
    });

    it('should allow greenevilleplumber.com origin', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'OPTIONS',
        headers: { origin: 'https://greenevilleplumber.com' },
      };

      const response = await handler(event);

      expect(response.headers['Access-Control-Allow-Origin']).toBe(
        'https://greenevilleplumber.com'
      );
    });

    it('should allow rogersvilleplumber.com origin', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'OPTIONS',
        headers: { origin: 'https://rogersvilleplumber.com' },
      };

      const response = await handler(event);

      expect(response.headers['Access-Control-Allow-Origin']).toBe(
        'https://rogersvilleplumber.com'
      );
    });

    it('should allow localhost for development', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'OPTIONS',
        headers: { origin: 'http://localhost:4321' },
      };

      const response = await handler(event);

      expect(response.headers['Access-Control-Allow-Origin']).toBe('http://localhost:4321');
    });
  });

  describe('Validation', () => {
    it('should reject requests without name', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'POST',
        headers: { origin: 'https://greenevilleplumber.com' },
        body: JSON.stringify({ phone: '423-555-1234' }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
      expect(JSON.parse(response.body).error).toContain('Name and phone are required');
    });

    it('should reject requests without phone', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'POST',
        headers: { origin: 'https://greenevilleplumber.com' },
        body: JSON.stringify({ name: 'John Doe' }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('Success Cases', () => {
    it('should accept valid form submission', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'POST',
        headers: { origin: 'https://greenevilleplumber.com' },
        body: JSON.stringify({
          name: 'John Doe',
          phone: '423-555-1234',
          email: 'john@example.com',
          service: 'Drain Cleaning',
          message: 'Need help with a clogged drain',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).success).toBe(true);
    });

    it('should work with only required fields', async () => {
      const handler = await createHandler();
      const event = {
        httpMethod: 'POST',
        headers: { origin: 'https://greenevilleplumber.com' },
        body: JSON.stringify({
          name: 'Jane Smith',
          phone: '423-555-5678',
        }),
      };

      const response = await handler(event);

      expect(response.statusCode).toBe(200);
    });
  });
});

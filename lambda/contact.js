import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const sesClient = new SESClient({
  region: process.env.AWS_REGION || 'us-east-1',
  ...(process.env.LOCALSTACK_HOSTNAME && {
    endpoint: `http://${process.env.LOCALSTACK_HOSTNAME}:4566`,
  }),
});

const ALLOWED_ORIGINS = [
  'https://greenevilleplumber.com',
  'https://www.greenevilleplumber.com',
  'https://rogersvilleplumber.com',
  'https://www.rogersvilleplumber.com',
  'http://localhost:4321', // Local development
];

const getCorsHeaders = (origin) => {
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
};

export const handler = async (event) => {
  const origin = event.headers?.origin || event.headers?.Origin || '';
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { name, phone, email, service, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Name and phone are required' }),
      };
    }

    const emailBody = `
New Contact Form Submission from Greeneville Plumber Website

Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}
Service Needed: ${service || 'Not specified'}

Message:
${message || 'No message provided'}

---
This email was sent from the contact form at greenevilleplumber.com
    `.trim();

    const command = new SendEmailCommand({
      Source: process.env.FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.TO_EMAIL],
      },
      Message: {
        Subject: {
          Data: `Contact Form: ${name} - ${service || 'General Inquiry'}`,
        },
        Body: {
          Text: { Data: emailBody },
        },
      },
    });

    await sesClient.send(command);

    // Log for LocalStack debugging
    if (process.env.ENVIRONMENT === 'dev') {
      console.log('Contact form submission:', { name, phone, email, service, message });
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, message: 'Message sent successfully' }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to send message. Please call us directly.' }),
    };
  }
};

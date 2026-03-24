/**
 * Pages Function: /api/contact
 * Receives portfolio contact form submissions and delivers via Resend.
 *
 * Required secret: RESEND_API_KEY (set via wrangler pages secret put)
 * Optional secret: TURNSTILE_SECRET_KEY (for bot validation)
 */

interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
}

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  site: string;
  turnstileToken?: string;
  website?: string; // honeypot
}

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyTurnstile(token: string, secret: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ secret, response: token });
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'Contact service not configured' }),
      { status: 503, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid request body' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  // Honeypot check — bots fill the hidden website field
  if (body.website) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: 'Name, email, and message are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  if (name.length > 200 || email.length > 200 || message.length > 4000) {
    return new Response(
      JSON.stringify({ error: 'Input too long' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  // Turnstile validation if configured and token provided
  if (env.TURNSTILE_SECRET_KEY && body.turnstileToken) {
    const valid = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET_KEY);
    if (!valid) {
      return new Response(
        JSON.stringify({ error: 'Bot check failed. Please try again.' }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const emailHtml = `
    <div style="font-family: monospace; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="color: #BF5700; margin-bottom: 8px;">New message via austinhumphrey.com</h2>
      <hr style="border: 1px solid #e5e5e5; margin-bottom: 16px;" />
      <p><strong>From:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <hr style="border: 1px solid #e5e5e5; margin: 16px 0;" />
      <p style="white-space: pre-wrap;">${safeMessage}</p>
    </div>
  `.trim();

  // Strip newlines from name to prevent header injection in subject
  const subjectName = name.replace(/[\r\n]/g, ' ').slice(0, 100);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <noreply@blazesportsintel.com>',
        to: ['Austin@BlazeSportsIntel.com'],
        reply_to: email,
        subject: `[austinhumphrey.com] Message from ${subjectName}`,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Resend error:', res.status, errText);
      return new Response(
        JSON.stringify({ error: 'Unable to send your message right now.' }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (err) {
    console.error('Contact function error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal error' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    status: 204,
    headers: corsHeaders,
  });

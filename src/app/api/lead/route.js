import { NextResponse } from 'next/server';
import { isSmtpReady, smtpStartup, transporter } from '@/service/nodemailerStartup';

// Initialize SMTP if configured
if (typeof smtpStartup === 'function') {
  smtpStartup().catch(() => {});
}

// In-memory rate limiting (5 requests per minute per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip) {
  const now = Date.now();

  // Occasional cleanup of expired entries
  if (rateLimitMap.size > 500) {
    for (const [key, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key);
      }
    }
  }

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

const ALLOWED_FINISH_LINES = ['Sales', 'Trust', 'Eyes', 'All'];
const ALLOWED_CHANNELS = ['Organic', 'Paid', 'Both', 'Not sure'];
const ALLOWED_DECISION_MAKERS = ['Me', 'Me + 1'];
const ALLOWED_BUDGETS = [
  'Budget is tight',
  "Still deciding if it's worth it",
  'Not sure, suggest for me',
];
const ALLOWED_PLANS = ['1 Month Plan', '3 Month Plan', '6 Month Plan'];
const PHONE_REGEX = /^\+91[6-9]\d{9}$/;

async function sendLeadEmail(leadData) {
  if (!isSmtpReady() || !process.env.EMAIL_USER) {
    console.log('[Lead Submission - Fallback mode (SMTP inactive)]:', leadData);
    return;
  }

  const {
    finishLine,
    channel,
    decisionMaker,
    budget,
    plan,
    businessName,
    phone,
    whatsappOptIn,
    sourcePage,
  } = leadData;

  const text = `New Strategy Form Submission:
Business Name: ${businessName}
Phone: ${phone} (WhatsApp Opt-in: ${whatsappOptIn ? 'Yes' : 'No'})
Finish Line: ${finishLine}
Channel: ${channel}
Decision Maker: ${decisionMaker}
Budget: ${budget}
Plan: ${plan}
Source Page: ${sourcePage}`;

  const html = `
<h2>New Free Strategy Lead Received!</h2>
<h3>Client Details:</h3>
<ul>
  <li><strong>Business Name:</strong> ${businessName}</li>
  <li><strong>Phone:</strong> ${phone}</li>
  <li><strong>WhatsApp Opt-in:</strong> ${whatsappOptIn ? 'Yes' : 'No'}</li>
  <li><strong>Finish Line Goal:</strong> ${finishLine}</li>
  <li><strong>Preferred Channel:</strong> ${channel}</li>
  <li><strong>Decision Maker:</strong> ${decisionMaker}</li>
  <li><strong>Budget:</strong> ${budget}</li>
  <li><strong>Selected Plan:</strong> ${plan}</li>
  <li><strong>Source Page:</strong> ${sourcePage}</li>
</ul>
`;

  try {
    await transporter.sendMail({
      from: `"Strategy Lead" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Strategy Lead: ${businessName} (${phone})`,
      text,
      html,
    });
    console.log('[Lead Mail] Lead notification sent successfully.');
  } catch (err) {
    console.error('[Lead Mail Error]:', err.message);
  }
}

export async function POST(request) {
  try {
    const clientIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (checkRateLimit(clientIp)) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const {
      finishLine,
      channel,
      decisionMaker,
      budget,
      plan,
      businessName,
      phone,
      whatsappOptIn,
      sourcePage,
      submittedAt,
      hp_company_url, // Honeypot field
    } = body;

    // Honeypot check: If bot filled the hidden honeypot, return success silently
    if (hp_company_url) {
      console.warn('[Lead Submission] Honeypot triggered by:', clientIp);
      return NextResponse.json({ ok: true });
    }

    // Validation
    const errors = [];

    if (!ALLOWED_FINISH_LINES.includes(finishLine)) {
      errors.push('Invalid finish line selection.');
    }
    if (!ALLOWED_CHANNELS.includes(channel)) {
      errors.push('Invalid channel selection.');
    }
    if (!ALLOWED_DECISION_MAKERS.includes(decisionMaker)) {
      errors.push('Invalid decision maker selection.');
    }
    if (!ALLOWED_BUDGETS.includes(budget)) {
      errors.push('Invalid budget selection.');
    }
    if (!ALLOWED_PLANS.includes(plan)) {
      errors.push('Invalid plan selection.');
    }

    const trimmedBusinessName = typeof businessName === 'string' ? businessName.trim() : '';
    if (trimmedBusinessName.length < 2 || trimmedBusinessName.length > 80) {
      errors.push('Business name must be between 2 and 80 characters.');
    }

    if (typeof phone !== 'string' || !PHONE_REGEX.test(phone)) {
      errors.push('Invalid phone number. Must be a 10-digit Indian number starting with 6-9.');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: errors.join(' ') },
        { status: 400 }
      );
    }

    const sanitizedData = {
      finishLine,
      channel,
      decisionMaker,
      budget,
      plan,
      businessName: trimmedBusinessName,
      phone,
      whatsappOptIn: Boolean(whatsappOptIn),
      sourcePage: sourcePage || '/service/branddesign',
      submittedAt: submittedAt || new Date().toISOString(),
    };

    // Forward to Webhook if configured
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.trim() !== '') {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sanitizedData),
        });
      } catch (webhookErr) {
        console.error('[Lead Webhook Exception]:', webhookErr);
      }
    }

    // Send email via nodemailer to site owner
    await sendLeadEmail(sanitizedData);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[Lead API Route Error]:', error);
    return NextResponse.json(
      { ok: false, error: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}

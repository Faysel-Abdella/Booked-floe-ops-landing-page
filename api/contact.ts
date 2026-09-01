// Sanitize user inputs
function sanitize(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper to safely extract request body in Vercel Serverless environment
async function parseRequestBody(req: any): Promise<Record<string, any>> {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    try {
      return JSON.parse(req.body);
    } catch {
      // ignore
    }
  }

  // If body is a stream (raw Node HTTP IncomingMessage in Vercel)
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk: any) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

// Send via Resend REST API (Pure Fetch - works anywhere without node_modules constraints)
async function sendViaResend(options: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${options.apiKey}`,
      },
      body: JSON.stringify({
        from: options.from,
        to: options.to,
        reply_to: options.replyTo,
        subject: options.subject,
        html: options.html,
      }),
    });

    const data = (await res.json().catch(() => ({}))) as any;

    if (res.ok) {
      return { success: true };
    }

    // If custom domain is not verified yet, fallback to onboarding@resend.dev
    if (res.status === 403 && options.from !== 'onboarding@resend.dev') {
      console.warn('[Resend Warning] Domain not verified. Retrying with onboarding@resend.dev...');
      const retryRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${options.apiKey}`,
        },
        body: JSON.stringify({
          from: 'BookedFlowOps <onboarding@resend.dev>',
          to: options.to,
          reply_to: options.replyTo,
          subject: options.subject,
          html: options.html,
        }),
      });

      if (retryRes.ok) {
        return { success: true };
      }
    }

    return {
      success: false,
      error: data?.message || `Resend API returned HTTP ${res.status}`,
    };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unknown network error calling Resend' };
  }
}

// Nodemailer SMTP transporter helper with dynamic import
async function sendViaSmtp(options: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (!host || !user || !pass) {
    return { success: false, error: 'SMTP credentials not provided' };
  }

  try {
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || options.from,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'SMTP delivery failed' };
  }
}

// Send optional webhook alert (Discord / Slack / generic webhook)
async function sendWebhookAlert(webhookUrl: string, payload: any) {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error('Failed to send webhook notification:', e);
  }
}

// Vercel Serverless Function Handler
export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed. Use POST.' });
    return;
  }

  try {
    const body = await parseRequestBody(req);

    const firstName = sanitize(body.firstName);
    const lastName = sanitize(body.lastName);
    const workEmail = sanitize(body.workEmail);
    const companyName = sanitize(body.companyName);
    const phone = sanitize(body.phone);
    const website = sanitize(body.website);
    const businessType = sanitize(body.businessType);
    const monthlyLeadsVolume = sanitize(body.monthlyLeadsVolume);
    const missedCallHandling = sanitize(body.missedCallHandling);
    const message = sanitize(body.message);

    const errors: Record<string, string> = {};

    if (!firstName) errors.firstName = 'First name is required';
    if (!workEmail) {
      errors.workEmail = 'Work email is required';
    } else if (!isValidEmail(workEmail)) {
      errors.workEmail = 'Please provide a valid email address';
    }
    if (!companyName) errors.companyName = 'Company name is required';
    if (!businessType) errors.businessType = 'Please select your business type';

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        message: 'Please fill in all required fields correctly.',
        errors,
      });
      return;
    }

    const submissionId = `BFO-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    const timestamp = new Date().toISOString();

    console.log(
      `[BookedFlowOps Lead Received on Vercel] ID: ${submissionId} | From: ${firstName} ${lastName} (${workEmail}) | Company: ${companyName}`
    );

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'hello@faysela.com';
    const fromAddress =
      process.env.RESEND_FROM ||
      process.env.SMTP_FROM ||
      'BookedFlowOps <onboarding@resend.dev>';

    const emailSubject = `New Lead Inquiry from ${companyName} (${firstName} ${lastName})`;
    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 24px; background: #ffffff;">
        <div style="background: #0f172a; padding: 20px 24px; border-radius: 12px 12px 0 0; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #38bdf8;">New Lead Inquiry Received</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8;">BookedFlowOps Lead Response Desk</p>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px; background: #ffffff;">
          <p style="margin-top: 0; font-size: 13px; color: #64748b;"><strong>Reference ID:</strong> <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${submissionId}</code></p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; width: 38%; color: #334155;">Full Name</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Work Email</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0284c7;"><a href="mailto:${workEmail}" style="color: #0284c7; text-decoration: none; font-weight: 500;">${workEmail}</a></td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Company</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Phone</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${phone || 'Not provided'}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Website</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${website ? `<a href="${website}" target="_blank" style="color: #0284c7;">${website}</a>` : 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Business Type</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${businessType}</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Monthly Leads Volume</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${monthlyLeadsVolume || 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; font-weight: 600; color: #334155;">Current Missed Call Handling</td>
              <td style="padding: 10px 12px; border: 1px solid #e2e8f0; color: #0f172a;">${missedCallHandling || 'Not specified'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b;">Additional Message / Notes:</h4>
            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #1e293b; white-space: pre-wrap;">${message || 'No additional notes provided.'}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #94a3b8;">
            Sent automatically by BookedFlowOps Website Lead System
          </div>
        </div>
      </div>
    `;

    let emailDelivered = false;
    let deliveryMethod = 'server_logged';
    let deliveryError: string | null = null;

    // 1. Try Resend HTTP API
    if (process.env.RESEND_API_KEY) {
      const resendResult = await sendViaResend({
        apiKey: process.env.RESEND_API_KEY,
        from: fromAddress,
        to: [recipientEmail],
        replyTo: workEmail,
        subject: emailSubject,
        html: emailHtml,
      });

      if (resendResult.success) {
        emailDelivered = true;
        deliveryMethod = 'resend_api';
        console.log(`[Vercel Email Delivery] Successfully sent via Resend API to ${recipientEmail}`);
      } else {
        deliveryError = resendResult.error || 'Resend delivery failed';
        console.error('[Vercel Email Delivery] Resend failed:', deliveryError);
      }
    }

    // 2. Try Nodemailer SMTP if Resend is not configured or failed
    if (!emailDelivered) {
      const smtpResult = await sendViaSmtp({
        from: process.env.SMTP_FROM || fromAddress,
        to: recipientEmail,
        replyTo: workEmail,
        subject: `[BookedFlowOps Lead] ${companyName} - ${firstName} ${lastName}`,
        text: `New Lead Inquiry\n\nName: ${firstName} ${lastName}\nEmail: ${workEmail}\nCompany: ${companyName}\nPhone: ${phone}\nWebsite: ${website}\nBusiness Type: ${businessType}\nMonthly Leads Volume: ${monthlyLeadsVolume}\nMissed Call Handling: ${missedCallHandling}\n\nMessage:\n${message}`,
        html: emailHtml,
      });

      if (smtpResult.success) {
        emailDelivered = true;
        deliveryMethod = 'smtp';
        console.log(`[Vercel Email Delivery] Successfully sent via SMTP to ${recipientEmail}`);
      } else if (smtpResult.error && smtpResult.error !== 'SMTP credentials not provided') {
        deliveryError = smtpResult.error;
        console.error('[Vercel Email Delivery] SMTP error:', deliveryError);
      }
    }

    // 3. Trigger optional Webhook if provided (e.g., Discord, Slack, Zapier, Make)
    const webhookUrl = process.env.WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL || process.env.SLACK_WEBHOOK_URL;
    if (webhookUrl) {
      await sendWebhookAlert(webhookUrl, {
        content: `🚨 **New Lead Inquiry from ${companyName}**\n**Contact:** ${firstName} ${lastName} (<${workEmail}>)\n**Phone:** ${phone || 'N/A'}\n**Business:** ${businessType} | **Volume:** ${monthlyLeadsVolume || 'N/A'}\n**Message:** ${message || 'N/A'}`,
        lead: {
          id: submissionId,
          timestamp,
          firstName,
          lastName,
          workEmail,
          companyName,
          phone,
          website,
          businessType,
          monthlyLeadsVolume,
          missedCallHandling,
          message,
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Thanks — your inquiry has been received. We'll be in touch shortly.",
      submissionId,
      details: {
        emailConfigured: emailDelivered,
        provider: deliveryMethod,
        recipient: recipientEmail,
        note: !emailDelivered
          ? 'Submission received & logged. To enable instant email delivery on Vercel, add RESEND_API_KEY in your Vercel Project Settings > Environment Variables.'
          : undefined,
      },
    });
  } catch (err: any) {
    console.error('Unexpected error in /api/contact handler:', err);
    res.status(500).json({
      success: false,
      message:
        'An error occurred while submitting the form. Please email us directly at contact@bookedflowops.com.',
    });
  }
}

import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));

interface ContactSubmission {
  id: string;
  timestamp: string;
  firstName: string;
  lastName?: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  website?: string;
  businessType: string;
  monthlyLeadsVolume?: string;
  missedCallHandling?: string;
  message?: string;
}

// In-memory submissions log (for local observability & audits)
const recentSubmissions: ContactSubmission[] = [];

// Helper to sanitize input strings
function sanitize(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper to build nodemailer transporter if credentials exist
function getMailerTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }
  return null;
}

// 1. API: Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'BookedFlowOps API Server',
    timestamp: new Date().toISOString(),
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
  });
});

// 2. API: Contact Form Submission
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const raw = req.body || {};

    const firstName = sanitize(raw.firstName);
    const lastName = sanitize(raw.lastName);
    const workEmail = sanitize(raw.workEmail);
    const companyName = sanitize(raw.companyName);
    const phone = sanitize(raw.phone);
    const website = sanitize(raw.website);
    const businessType = sanitize(raw.businessType);
    const monthlyLeadsVolume = sanitize(raw.monthlyLeadsVolume);
    const missedCallHandling = sanitize(raw.missedCallHandling);
    const message = sanitize(raw.message);

    const errors: Record<string, string> = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!workEmail) {
      errors.workEmail = 'Work email is required';
    } else if (!isValidEmail(workEmail)) {
      errors.workEmail = 'Please provide a valid email address';
    }
    if (!companyName) {
      errors.companyName = 'Company name is required';
    }
    if (!businessType) {
      errors.businessType = 'Please select your business type';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        success: false,
        message: 'Please fill in all required fields correctly.',
        errors,
      });
      return;
    }

    const submissionId = `BFO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    const submission: ContactSubmission = {
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
    };

    // Store in audit list (capped at 100)
    recentSubmissions.unshift(submission);
    if (recentSubmissions.length > 100) {
      recentSubmissions.pop();
    }

    console.log(`[BookedFlowOps Lead Received] ID: ${submissionId} | From: ${firstName} ${lastName} (${workEmail}) | Company: ${companyName}`);

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'hello@faysela.com';
    const fromAddress = process.env.SMTP_FROM || 'BookedFlowOps <notifications@bookedflowops.com>';

    let emailDelivered = false;
    let deliveryMethod = 'server_logged';

    // Attempt delivery via Resend HTTP API if key exists
    if (process.env.RESEND_API_KEY) {
      try {
        let resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || fromAddress,
            to: [recipientEmail],
            reply_to: workEmail,
            subject: `New Lead Inquiry from ${companyName} (${firstName} ${lastName})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 20px;">
                <h2 style="color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">New Lead Flow Inquiry</h2>
                <p><strong>Submission ID:</strong> ${submissionId}</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Name</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Work Email</td><td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${workEmail}">${workEmail}</a></td></tr>
                  <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${companyName}</td></tr>
                  <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${phone || 'Not provided'}</td></tr>
                  <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Website</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${website || 'Not provided'}</td></tr>
                  <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Business Type</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${businessType}</td></tr>
                  <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Monthly Lead Volume</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${monthlyLeadsVolume || 'Not specified'}</td></tr>
                  <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Current Missed Call Handling</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${missedCallHandling || 'Not specified'}</td></tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 6px;">
                  <h4 style="margin: 0 0 8px 0;">Message / Details:</h4>
                  <p style="margin: 0; white-space: pre-wrap;">${message || 'No additional notes provided.'}</p>
                </div>
              </div>
            `,
          }),
        });

        if (resendResponse.status === 403) {
          // Retry with default onboarding@resend.dev
          resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: 'BookedFlowOps <onboarding@resend.dev>',
              to: [recipientEmail],
              reply_to: workEmail,
              subject: `New Lead Inquiry from ${companyName} (${firstName} ${lastName})`,
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 20px;">
                  <h2 style="color: #0f172a; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">New Lead Flow Inquiry</h2>
                  <p><strong>Submission ID:</strong> ${submissionId}</p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Name</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${firstName} ${lastName}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Work Email</td><td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${workEmail}">${workEmail}</a></td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${companyName}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Phone</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${phone || 'Not provided'}</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Website</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${website || 'Not provided'}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Business Type</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${businessType}</td></tr>
                    <tr style="background: #f8fafc;"><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Monthly Lead Volume</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${monthlyLeadsVolume || 'Not specified'}</td></tr>
                    <tr><td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold;">Current Missed Call Handling</td><td style="padding: 8px; border: 1px solid #e2e8f0;">${missedCallHandling || 'Not specified'}</td></tr>
                  </table>
                  <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 6px;">
                    <h4 style="margin: 0 0 8px 0;">Message / Details:</h4>
                    <p style="margin: 0; white-space: pre-wrap;">${message || 'No additional notes provided.'}</p>
                  </div>
                </div>
              `,
            }),
          });
        }

        if (resendResponse.ok) {
          emailDelivered = true;
          deliveryMethod = 'resend_api';
        }
      } catch (mailErr) {
        console.error('Error dispatching via Resend API:', mailErr);
      }
    }

    // Attempt delivery via SMTP transporter if configured and not yet sent
    if (!emailDelivered) {
      const transporter = getMailerTransport();
      if (transporter) {
        try {
          await transporter.sendMail({
            from: fromAddress,
            to: recipientEmail,
            replyTo: workEmail,
            subject: `[BookedFlowOps Lead] ${companyName} - ${firstName} ${lastName}`,
            text: `New Lead Inquiry\n\nName: ${firstName} ${lastName}\nEmail: ${workEmail}\nCompany: ${companyName}\nPhone: ${phone}\nBusiness Type: ${businessType}\nMonthly Leads: ${monthlyLeadsVolume}\nMissed Call Handling: ${missedCallHandling}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: sans-serif; color: #0f172a; max-width: 600px; padding: 20px;">
                <h2 style="color: #0284c7;">New Lead Inquiry: ${companyName}</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${workEmail}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Business Type:</strong> ${businessType}</p>
                <p><strong>Monthly Volume:</strong> ${monthlyLeadsVolume || 'N/A'}</p>
                <p><strong>Current Missed Call Handling:</strong> ${missedCallHandling || 'N/A'}</p>
                <p><strong>Message:</strong><br/>${message || 'N/A'}</p>
              </div>
            `,
          });

          // Also send automatic confirmation receipt to the lead
          await transporter.sendMail({
            from: fromAddress,
            to: workEmail,
            subject: `We received your inquiry - BookedFlowOps`,
            text: `Hi ${firstName},\n\nThanks for reaching out to BookedFlowOps. We have received your inquiry regarding your lead flow at ${companyName}.\n\nOur team will review your details and be in touch shortly to discuss how we can help recover missed calls and accelerate your speed-to-lead.\n\nBest regards,\nThe BookedFlowOps Team\nhttps://bookedflowops.com`,
          });

          emailDelivered = true;
          deliveryMethod = 'smtp';
        } catch (smtpErr) {
          console.error('Error dispatching via SMTP:', smtpErr);
        }
      }
    }

    res.status(200).json({
      success: true,
      message: "Thanks — your inquiry has been received. We'll be in touch shortly.",
      submissionId,
      details: {
        emailConfigured: emailDelivered,
        provider: deliveryMethod,
      },
    });
  } catch (err) {
    console.error('Unexpected error processing contact form:', err);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred while processing your request. Please try again or email us directly at hello@faysela.com.',
    });
  }
});

// 3. API: Live Chat Initiation & Visitor Message Notification
interface ChatSessionRecord {
  sessionId: string;
  startedAt: string;
  lastMessageAt: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  messages: Array<{
    id: string;
    sender: 'agent' | 'user' | 'system';
    text: string;
    timestamp: string;
  }>;
}

const activeChatSessions: Map<string, ChatSessionRecord> = new Map();

app.post('/api/chat/message', async (req: Request, res: Response) => {
  try {
    const raw = req.body || {};
    const sessionId = sanitize(raw.sessionId) || `CHAT-${Date.now().toString(36).toUpperCase()}`;
    const messageText = sanitize(raw.message);
    const visitorName = sanitize(raw.visitorName) || 'Website Visitor';
    const visitorEmail = sanitize(raw.visitorEmail);
    const visitorPhone = sanitize(raw.visitorPhone);
    const isFirstMessage = Boolean(raw.isFirstMessage);
    const clientTimestamp = raw.timestamp || new Date().toISOString();

    if (!messageText) {
      res.status(400).json({
        success: false,
        message: 'Message content is required.',
      });
      return;
    }

    // Update in-memory session
    let session = activeChatSessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        startedAt: new Date().toISOString(),
        lastMessageAt: new Date().toISOString(),
        visitorName,
        visitorEmail,
        visitorPhone,
        messages: [],
      };
      activeChatSessions.set(sessionId, session);
    }

    if (visitorEmail) session.visitorEmail = visitorEmail;
    if (visitorPhone) session.visitorPhone = visitorPhone;
    if (visitorName && visitorName !== 'Website Visitor') session.visitorName = visitorName;

    session.lastMessageAt = new Date().toISOString();
    session.messages.push({
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender: 'user',
      text: messageText,
      timestamp: clientTimestamp,
    });

    console.log(`[BookedFlowOps Live Chat] [${sessionId}] New message from ${session.visitorName} (${session.visitorEmail || 'no email'}): "${messageText}"`);

    // Prepare email notification to hello@faysela.com
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'hello@faysela.com';
    const fromAddress = process.env.SMTP_FROM || 'BookedFlowOps Chat <notifications@bookedflowops.com>';

    const emailSubject = `[Live Chat Alert] ${session.visitorName} initiated chat on BookedFlowOps`;
    const transcriptHtml = session.messages
      .map(
        (m) =>
          `<div style="margin-bottom: 8px; padding: 8px 12px; border-radius: 6px; background: ${
            m.sender === 'user' ? '#f0f9ff; border-left: 3px solid #0284c7;' : '#f8fafc;'
          }">
            <strong style="color: ${m.sender === 'user' ? '#0369a1' : '#475569'};">${
            m.sender === 'user' ? (session?.visitorName || 'Visitor') : 'BookedFlowOps Desk'
          }:</strong>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #1e293b;">${m.text}</p>
            <span style="font-size: 11px; color: #94a3b8;">${new Date(m.timestamp).toLocaleTimeString()}</span>
          </div>`
      )
      .join('');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #0f172a; padding: 20px;">
        <div style="background: #0f172a; padding: 16px 20px; border-radius: 8px 8px 0 0; color: #ffffff;">
          <h2 style="margin: 0; font-size: 18px; color: #38bdf8;">BookedFlowOps — Live Chat Notification</h2>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">A visitor is chatting on bookedflowops.com</p>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 20px; border-radius: 0 0 8px 8px; background: #ffffff;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; margin-bottom: 16px;">
            <p style="margin: 2px 0;"><strong>Session ID:</strong> <code>${sessionId}</code></p>
            <p style="margin: 2px 0;"><strong>Visitor Name:</strong> ${session.visitorName}</p>
            <p style="margin: 2px 0;"><strong>Email:</strong> ${session.visitorEmail ? `<a href="mailto:${session.visitorEmail}">${session.visitorEmail}</a>` : 'Not provided yet'}</p>
            <p style="margin: 2px 0;"><strong>Phone:</strong> ${session.visitorPhone || 'Not provided yet'}</p>
            <p style="margin: 2px 0;"><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <h3 style="font-size: 15px; color: #0f172a; margin-bottom: 10px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px;">Live Conversation Transcript</h3>
          <div style="margin-top: 10px;">
            ${transcriptHtml}
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            Sent automatically by BookedFlowOps Lead Response Notification Engine.
          </div>
        </div>
      </div>
    `;

    let notificationSent = false;

    // Send via Resend API if available
    if (process.env.RESEND_API_KEY) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: fromAddress,
            to: [recipientEmail],
            reply_to: session.visitorEmail || undefined,
            subject: emailSubject,
            html: emailHtml,
          }),
        });
        if (resendResponse.ok) {
          notificationSent = true;
        }
      } catch (mailErr) {
        console.error('Error sending chat notification via Resend:', mailErr);
      }
    }

    // Send via SMTP transporter if available & not yet sent
    if (!notificationSent) {
      const transporter = getMailerTransport();
      if (transporter) {
        try {
          await transporter.sendMail({
            from: fromAddress,
            to: recipientEmail,
            replyTo: session.visitorEmail || undefined,
            subject: emailSubject,
            html: emailHtml,
          });
          notificationSent = true;
        } catch (smtpErr) {
          console.error('Error sending chat notification via SMTP:', smtpErr);
        }
      }
    }

    // Formulate automated system response acknowledging lead-response focus
    let automatedReply = "Thanks for reaching out! A team member has been notified and will be with you shortly. At BookedFlowOps, we build instant lead-response and missed-call recovery workflows for service businesses so you never lose a customer to response delay. Feel free to leave your name and work email or phone number if you'd like us to follow up directly.";

    const lowerMsg = messageText.toLowerCase();
    if (lowerMsg.includes('crm') || lowerMsg.includes('servicetitan') || lowerMsg.includes('jobber') || lowerMsg.includes('housecall')) {
      automatedReply = "A team member has been notified and will jump in shortly! To answer your CRM question: BookedFlowOps connects directly into industry CRMs like ServiceTitan, Jobber, Housecall Pro, HubSpot, and Google Calendar. As soon as an inbound lead or missed call is qualified via SMS, the customer details and booking status sync automatically to your dispatch schedule.";
    } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('pricing') || lowerMsg.includes('rate')) {
      automatedReply = "A team member has been notified and will respond in a moment! Our implementations are tailored to your trade, lead volume, and whether you need missed-call text-back, web-form speed-to-lead, or complete CRM booking integration. We can review exact options on a quick 20-minute Strategy Call.";
    } else if (lowerMsg.includes('how it works') || lowerMsg.includes('missed call') || lowerMsg.includes('phone')) {
      automatedReply = "A team member has been notified and will be with you shortly! The core BookedFlowOps workflow operates in under 10 seconds: when a customer call goes unanswered, an automated, tailored text engages them immediately, collects job details or zip code, and guides them straight into booking before they call your competitor.";
    }

    // Save automated reply to session
    session.messages.push({
      id: `msg-${Date.now() + 1}`,
      sender: 'agent',
      text: automatedReply,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({
      success: true,
      sessionId,
      message: 'Message processed and notification dispatched.',
      notificationSent,
      automatedReply,
    });
  } catch (err) {
    console.error('Unexpected error in chat message handler:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BookedFlowOps server running at http://localhost:${PORT}`);
  });
}

startServer();

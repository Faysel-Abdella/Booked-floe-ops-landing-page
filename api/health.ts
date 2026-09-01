export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    status: 'ok',
    service: 'BookedFlowOps Vercel API',
    timestamp: new Date().toISOString(),
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
    resendConfigured: Boolean(process.env.RESEND_API_KEY),
    notificationEmail: process.env.NOTIFICATION_EMAIL || 'hello@faysela.com',
  });
}

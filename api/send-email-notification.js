// Vercel Serverless Function for Email Notifications
// Works with Gmail SMTP (Node.js compatible)

import nodemailer from 'nodemailer';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type, slug, profileOwnerEmail, profileName, testEmail } = req.body;

    // Configure Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Test mode: Send test email
    if (testEmail) {
      await transporter.sendMail({
        from: `"Hushh Notifications" <${process.env.GMAIL_USER}>`,
        to: testEmail,
        subject: '🧪 Test Email from Hushh',
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
            <h2>✅ Email System Working!</h2>
            <p>This is a test email from your Hushh notification system.</p>
            <p><strong>Gmail:</strong> ${process.env.GMAIL_USER}</p>
            <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
            <p>If you receive this, email notifications are working! 🎉</p>
          </div>
        `,
      });

      return res.status(200).json({ success: true, message: 'Test email sent!' });
    }

    // Validate required fields
    if (!type || !slug || !profileOwnerEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let subject = '';
    let html = '';

    // Build email based on type
    if (type === 'profile_view') {
      const viewTime = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      subject = `👀 New Profile View - ${profileName || 'Your Profile'}`;
      html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A84FF;">👀 Someone is viewing your profile!</h2>
          
          <div style="background: #F8FAFC; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Profile:</strong> ${profileName}</p>
            <p style="margin: 8px 0;"><strong>Time:</strong> ${viewTime}</p>
            <p style="margin: 8px 0;"><strong>Visitor:</strong> Anonymous</p>
          </div>

          <a href="https://hushhtech.com/investor/${slug}" 
             style="display: inline-block; background: #0A84FF; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; margin-top: 16px;">
            View Your Profile →
          </a>

          <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
            Instant notification - someone is browsing your profile now.
          </p>
        </div>
      `;
    } else if (type === 'payment_received') {
      const paymentTime = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      subject = `💰 Payment Received - $1.00`;
      html = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #34C759;">💰 Payment Received!</h2>
          
          <p style="font-size: 16px; color: #0B1120;">
            Great news! Someone just paid to unlock chat access.
          </p>

          <div style="background: #F0F9FF; border-left: 4px solid #0A84FF; padding: 20px; margin: 20px 0;">
            <p style="margin: 8px 0;"><strong>Amount:</strong> $1.00</p>
            <p style="margin: 8px 0;"><strong>Access:</strong> 30 minutes</p>
            <p style="margin: 8px 0;"><strong>Profile:</strong> ${profileName}</p>
            <p style="margin: 8px 0;"><strong>Time:</strong> ${paymentTime}</p>
          </div>

          <a href="https://hushhtech.com/investor/${slug}" 
             style="display: inline-block; background: #34C759; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 8px; margin-top: 16px;">
            View Your Profile →
          </a>

          <p style="color: #6B7280; font-size: 14px; margin-top: 32px;">
            Check your Stripe dashboard for payout details.
          </p>
        </div>
      `;
    }

    // Send email
    await transporter.sendMail({
      from: `"Hushh Notifications" <${process.env.GMAIL_USER}>`,
      to: profileOwnerEmail,
      subject,
      html,
    });

    return res.status(200).json({ success: true, emailSent: true });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to send email',
      details: error.toString()
    });
  }
}

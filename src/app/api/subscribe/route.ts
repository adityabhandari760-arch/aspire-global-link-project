import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER || '"Aspire Globallink" <noreply@aspiregloballink.com>',
      to: process.env.SMTP_TO,
      subject: `New Newsletter Subscription`,
      html: `
        <div style="background-color:#f4f4f7;padding:40px 0;font-family:Arial,sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">


<!-- Header -->
<tr>
  <td style="background:#111827;color:#ffffff;padding:20px;text-align:center;">
    <h2 style="margin:0;font-size:20px;font-weight:600;">🎉 New Subscriber</h2>
  </td>
</tr>

<!-- Body -->
<tr>
  <td style="padding:30px;">
    <p style="color:#6b7280;font-size:14px;margin-bottom:20px;">
      Great news! A new user has joined your newsletter.
    </p>

    <!-- Subscriber Info Card -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;">
      <tr>
        <td style="padding:15px;color:#374151;font-size:14px;">
          <strong style="color:#111827;">Subscriber Email:</strong><br />
          <span style="color:#2563eb;font-weight:500;">${email}</span>
        </td>
      </tr>
    </table>

    <!-- Optional CTA -->
    <div style="margin-top:25px;text-align:center;">
      <a href="#" style="display:inline-block;background:#111827;color:#ffffff;padding:10px 18px;border-radius:6px;text-decoration:none;font-size:14px;">
        View Subscribers
      </a>
    </div>
  </td>
</tr>

<!-- Footer -->
<tr>
  <td style="background:#f9fafb;text-align:center;padding:20px;font-size:12px;color:#9ca3af;">
    © ${new Date().getFullYear()} Aspire Globallink. All rights reserved.
  </td>
</tr>


  </table>
</div>

      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

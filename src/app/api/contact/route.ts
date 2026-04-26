import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message, phone } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // SMTP configuration should be coming from process.env
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
      subject: `New Contact Form Submission from ${name}`,
      html: `<div style="background-color:#f4f4f7;padding:40px 0;font-family:Arial,sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">


<tr>
  <td style="background:#111827;color:#ffffff;padding:20px;text-align:center;">
    <h2 style="margin:0;font-size:20px;font-weight:600;">New Contact Submission</h2>
  </td>
</tr>


<tr>
  <td style="padding:30px;">
    <p style="color:#6b7280;font-size:14px;margin-bottom:20px;">
      You’ve received a new message from your website contact form.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;padding:15px;">
      <tr>
        <td style="padding:8px 0;color:#374151;"><strong>Name:</strong> ${name}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;color:#374151;"><strong>Email:</strong> ${email}</td>
      </tr>
      ${phone ? `
      <tr>
        <td style="padding:8px 0;color:#374151;"><strong>Phone:</strong> ${phone}</td>
      </tr>` : ''}
    </table>

    <div style="margin-top:20px;">
      <p style="font-weight:600;color:#111827;margin-bottom:8px;">Message:</p>
      <div style="background:#f9fafb;padding:15px;border-radius:8px;color:#374151;line-height:1.6;">
        ${message}
      </div>
    </div>

  </td>
</tr>


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
    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import type { ContactFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // ── Uncomment to enable email via Nodemailer ───────────────────────────
    // import nodemailer from 'nodemailer';
    //
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT) || 587,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    //
    // await transporter.sendMail({
    //   from: `"${name}" <${email}>`,
    //   to: process.env.CONTACT_EMAIL,
    //   subject: body.subject || `Portfolio contact from ${name}`,
    //   html: `<p><strong>${name}</strong> (${email})</p><p>${message}</p>`,
    // });
    // ─────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true, message: 'Your message has been sent successfully!' });
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

// app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, subject, message } = await req.json();

  try {
    const data = await resend.emails.send({
      from: 'PlotCenter <chiro@correos.milcraft.fun>',
      to,
      subject,
      html: `<div style="font-family: sans-serif;">
        <p>${message}</p>
      </div>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

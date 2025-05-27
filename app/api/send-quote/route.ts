import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const formData = await req.formData();

  const nombre = formData.get('nombre') as string;
  const celular = formData.get('celular') as string;
  const email = formData.get('email') as string;
  const servicio = formData.get('servicio') as string;
  const comentario = formData.get('comentario') as string;
  const file = formData.get('archivo') as File | null;

  let imageHtml = '';

  if (file && file.type.startsWith('image/')) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString('base64');
  
    imageHtml = `
      <p><strong>Imagen Referencial:</strong></p>
      <img src="data:${file.type};base64,${base64}" alt="adjunto" style="max-width:400px; border:1px solid #ccc; border-radius:8px" />
    `;
  }

  try {
    const data = await resend.emails.send({
      from: 'PlotCenter <chiro@correos.milcraft.fun>',
      to: 'bytessavvy@gmail.com',
      subject: `Nueva solicitud de cotización - ${servicio}`,
      html: `
        <div style="font-family: sans-serif; color: #333">
          <h2>Solicitud de Cotización</h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Celular:</strong> ${celular}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Servicio:</strong> ${servicio}</p>
          <p><strong>Comentario:</strong><br/>${comentario}</p>
          ${imageHtml}
        </div>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

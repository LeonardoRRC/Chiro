import { NextRequest, NextResponse } from 'next/server';
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  const { items, email } = await req.json();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!items || !Array.isArray(items) || items.length === 0 || !email) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
  }

  const products = items
    .filter((item: any) => item.name && item.price > 0 && item.quantity > 0)
    .map((item: any) => ({
      title: String(item.name),
      quantity: Number(item.quantity),
      currency_id: 'PEN',
      unit_price: Number(item.price),
    }));

  console.log('🧾 Productos enviados a MercadoPago:', products);

  try {
    const preference = {
      items: [
        {
          title: 'Producto de prueba',
          quantity: 1,
          currency_id: 'PEN',
          unit_price: 10,
        },
      ],
      payer: { email: 'cliente@test.com' },
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    return NextResponse.json({ init_point: response.body.init_point });
  } catch (err) {
    console.error('❌ Error creando preferencia:', err);
    return NextResponse.json({ error: 'No se pudo crear la preferencia' }, { status: 500 });
  }
}

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, total, removeItem, clearCart } = useCart();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email || total <= 0 || items.length === 0) {
      alert('Por favor, completa tu correo y verifica el carrito.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, email }),
      });

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('No se pudo generar el enlace de pago.');
      }
    } catch (err) {
      console.error(err);
      alert('Error al procesar el pago.');
    }

    setLoading(false);
  };

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6 text-red-600" />
        <h1 className="text-3xl font-bold">Carrito de compras</h1>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 mb-4">Tu carrito está vacío.</p>
          <Link href="/tienda">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
              Ir a la tienda
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} className="flex items-center border-b pb-4 gap-4">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded border object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.size && <p className="text-sm text-gray-600">{item.size}</p>}
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  <p className="text-red-600 font-bold">S/ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-600 transition"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-600 transition"
            >
              Vaciar carrito
            </button>

            <div className="text-right w-full sm:w-auto">
              <p className="text-lg font-semibold mb-4">
                Total: <span className="text-red-600">S/ {total.toFixed(2)}</span>
              </p>

              <div className="space-y-3 text-left">
                <input
                  type="email"
                  placeholder="Correo del comprador"
                  className="w-full border px-3 py-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  disabled={loading}
                  onClick={handleCheckout}
                  className="w-full bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                >
                  {loading ? 'Redirigiendo...' : 'Finalizar compra'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

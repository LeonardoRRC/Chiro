'use client';

import { Facebook, Instagram, MapPin, Phone, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import QuoteModal from '@/components/QuoteModal';

export default function Header() {

  const { items } = useCart();

  return (
    <header className="w-full">
      <div className="bg-red-600 text-white text-sm font-medium">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-end items-center space-x-4">
          <a href="#" className="hover:opacity-80"><Facebook className="w-5 h-5" /></a>
          <a href="#" className="hover:opacity-80"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="hover:underline">Nosotros</a>
          <a href="#" className="hover:underline">Tienda</a>
        </div>
      </div>

      <div className="bg-white relative">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between gap-6 relative">
          <div className="z-10 flex items-center gap-4">
            <QuoteModal />
            <div className="relative">
              <Link href="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-red-600 transition" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Plotcenter Logo"
                width={160}
                height={60}
                className="mx-auto cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex flex-col text-sm text-gray-700 text-right z-10">
            <p className="text-base font-semibold text-gray-800">Soluciones Digitales</p>
            <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 mt-1">
              <div className="flex items-center gap-1 justify-end">
                <Phone className="w-4 h-4 text-pink-600" />
                (01) 234-5678
              </div>
              <div className="flex items-center gap-1 justify-end">
                <MapPin className="w-4 h-4 text-pink-600" />
                Av. Ejemplo 123, Lima, Perú
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[url('/bg-black.jpg')] bg-black bg-cover text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 flex justify-center">
        <Image
          src="/logo-blank.png"
          alt="Plotcenter Logo"
          width={200}
          height={60}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

        {/* Sede ATE */}
        <div>
          <h4 className="text-red-500 font-bold mb-1">SEDE ATE</h4>
          <p className="text-gray-300">Av. Nicolas Ayllon N° 3080 Tda. 8<br />Ate – <strong>Frente al Mall Santa Anita</strong></p>
          <p className="mt-1">987 769 078</p>
          <p className="text-gray-400">Lunes – Viernes: 8 am – 7 pm<br />Sábados: 8 am – 6 pm</p>
        </div>

        {/* Sede PERDICES */}
        <div>
          <h4 className="text-red-500 font-bold mb-1">SEDE PERDICES</h4>
          <p className="text-gray-300">Las Perdices N° 217<br /><strong>Santa Anita – Lima</strong></p>
          <p className="mt-1">01 302 0097 – 997 549 745</p>
          <p className="text-gray-400">Lunes – Viernes: 8 am – 7 pm<br />Sábados: 8 am – 6 pm</p>
        </div>

        {/* Sede RUISEÑORES */}
        <div>
          <h4 className="text-red-500 font-bold mb-1">SEDE RUISEÑORES</h4>
          <p className="text-gray-300">Av. los Ruiseñores N° 260<br /><strong>Santa Anita – Lima</strong></p>
          <p className="mt-1">01 362 0035 – 914 062 616</p>
          <p className="text-gray-400">Lunes – Viernes: 8 am – 7 pm<br />Sábados: 8 am – 6 pm</p>
        </div>

        {/* Central Telefónica */}
        <div className="flex flex-col items-center md:items-end justify-center md:justify-start">
          <h4 className="text-red-500 font-bold mb-1">CENTRAL TELEFÓNICA</h4>
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/call.svg"
              alt="Teléfono"
              width={30}
              height={30}
              className="invert filter"
            />
            <p className="text-2xl font-extrabold">
              01 <span className="text-white">362 0035</span>
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="bg-white rounded-full p-2 hover:bg-red-100 transition">
              <Facebook className="text-black w-5 h-5" />
            </a>
            <a href="#" className="bg-white rounded-full p-2 hover:bg-red-100 transition">
              <Instagram className="text-black w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700" />
      <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400 text-xs flex flex-col items-center gap-4">
        <Image src="/medios.png" alt="Medios de pago" width={300} height={30} className="mx-auto" />
        <p>
          &copy; 2025 – Plotcenter. All Rights Reserved. <span className="text-red-500">Powered by Angelo (Senati)</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-white font-light">
          <Link href="#">Nosotros</Link>
          <Link href="/libroreclamaciones">Libro de Reclamaciones</Link>
          <Link href="#">Contáctanos</Link>
        </div>
      </div>
    </footer>
  );
}

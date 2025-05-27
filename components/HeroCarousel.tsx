'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    image: '/carrusel/1.jpg',
    title: 'Rotulados',
    subtitle: 'Impresión Express',
    description: 'El inicio de cualquier proyecto exitoso.',
  },
  {
    image: '/carrusel/2.jpg',
    title: 'Viniles',
    subtitle: 'Diseño a medida',
    description: 'Perfectos para interiores y exteriores.',
  },
  {
    image: '/carrusel/3.jpg',
    title: 'Impresiones',
    subtitle: 'Alta Resolución',
    description: 'Calidad que se nota en cada detalle.',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[450px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">{slide.title}</h1>
            <p className="text-2xl md:text-3xl font-medium mt-2">{slide.subtitle}</p>
            <p className="text-lg md:text-xl font-medium mt-3">{slide.description}</p>
            <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold transition">
              Inicia tu Proyecto
            </button>
          </div>
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${i === current ? 'bg-red-600' : 'bg-white/50'} transition`}
          />
        ))}
      </div>
    </section>
  );
}

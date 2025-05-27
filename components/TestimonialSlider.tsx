"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana R.",
    company: "Lima",
    quote: "El trabajo fue impecable y muy rápido. Súper recomendado.",
  },
  {
    name: "Carlos M.",
    company: "San Isidro",
    quote: "Excelente atención al cliente y gran calidad de impresión.",
  },
  {
    name: "Lucía V.",
    company: "Surco",
    quote: "Siempre los elijo para mis campañas publicitarias. ¡Gracias!",
  },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const generateAvatar = (name: string) => {
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=FEE2E2&textColor=991B1B`;
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black">Nuestros Clientes</h2>
        <p className="text-gray-600 text-base mb-8">Conoce lo que opinan quienes ya confiaron en nuestros servicios.</p>

        <div className="relative bg-white shadow-md rounded-lg px-8 py-10">
          <Quote className="absolute top-4 left-4 text-red-500 w-6 h-6" />

          <p className="text-lg text-gray-700 italic mb-6">
            “{testimonials[index].quote}”
          </p>

          <div className="flex flex-col items-center">
            <img
              src={generateAvatar(testimonials[index].name)}
              alt={testimonials[index].name}
              className="w-16 h-16 rounded-full object-cover mb-2 border border-red-300"
            />
            <p className="font-semibold text-gray-900">{testimonials[index].name}</p>
            <p className="text-sm text-gray-500">{testimonials[index].company}</p>
          </div>

          <button className="mt-6 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md shadow transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Escribir mi testimonio
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                i === index ? "bg-red-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

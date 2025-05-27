"use client";

import { BadgeCheck, Clock, ThumbsUp, DollarSign, ArrowBigDownDash } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <BadgeCheck className="w-8 h-8 text-red-600" />,
    title: "Calidad Garantizada",
    description: "Impresiones en alta resolución con materiales de primera."
  },
  {
    icon: <Clock className="w-8 h-8 text-red-600" />,
    title: "Entrega Rápida",
    description: "Cumplimos plazos ajustados sin sacrificar calidad."
  },
  {
    icon: <ThumbsUp className="w-8 h-8 text-red-600" />,
    title: "Atención Personalizada",
    description: "Te asesoramos en cada etapa de tu proyecto."
  },
  {
    icon: <DollarSign className="w-8 h-8 text-red-600" />,
    title: "Precios Competitivos",
    description: "Ofrecemos la mejor relación calidad-precio del mercado."
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-16 relative">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-black mb-4">¿Por qué elegirnos?</h2>
        <p className="text-gray-600 mb-10">Descubre lo que hace única nuestra propuesta en impresión digital.</p>

        {/* Flechas animadas sobre cada columna */}
        <div className="absolute hidden lg:flex justify-between top-8 left-0 right-0 px-24 z-0">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.3 }}
            >
              <ArrowBigDownDash className="w-8 h-8 text-red-400 opacity-70" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-lg shadow hover:shadow-md p-6 text-center transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

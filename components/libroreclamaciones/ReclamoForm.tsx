'use client';

import { useState } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

const steps = [
  { label: 'Consumidor Reclamante' },
  { label: 'Bien Contratado' },
  { label: 'Pedido del Consumidor' },
];

export default function ReclamoForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="max-w-5xl mx-auto py-12 px-4">
      {/* Indicadores con barra completa */}
      <div className="relative flex justify-between items-center mb-10 px-4">
        {/* Línea gris de fondo completa */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-[-1]" />

        {/* Pasos */}
        {steps.map((s, i) => {
          const current = i + 1 === step;
          const completed = i + 1 < step;
          return (
            <div key={i} className="relative z-10 flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                  ${current ? 'bg-red-600 text-white' : completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs mt-1 text-center transition-all duration-200
                  ${current ? 'text-red-600 font-medium' : 'text-gray-500'}`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Contenido del paso */}
      {step === 1 && <StepOne onNext={nextStep} />}
      {step === 2 && <StepTwo onNext={nextStep} onPrev={prevStep} />}
      {step === 3 && <StepThree onPrev={prevStep} />}
    </section>
  );
}

'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

export default function StepTwo({ onNext, onPrev }: Props) {
  const [form, setForm] = useState({
    tipo: '',
    monto: '',
    descripcion: '',
  });

  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = Object.values(form).every((val) => val.trim() !== '');

  const handleNext = () => {
    setTouched(true);
    if (isValid) onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Indicador visual */}
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500">
          Indícanos si fue un bien o servicio, el monto reclamado y una breve descripción del problema.
        </p>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="relative">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="appearance-none w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-red-600"
            required
          >
            <option value="">Seleccione si es un Bien o Servicio *</option>
            <option>Bien</option>
            <option>Servicio</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        </div>

        <input
          name="monto"
          type="number"
          min={0}
          placeholder="Monto Reclamado en S/. *"
          value={form.monto}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
          required
        />

        <textarea
          name="descripcion"
          placeholder="Descripción *"
          rows={5}
          value={form.descripcion}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 col-span-2 focus:outline-red-600"
          required
        />

        {touched && !isValid && (
          <div className="col-span-2 text-red-600 text-sm font-medium">
            Por favor, completa todos los campos requeridos.
          </div>
        )}

        <div className="col-span-2 flex gap-4 mt-4">
          <button
            type="button"
            onClick={onPrev}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
          >
            Anterior
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}

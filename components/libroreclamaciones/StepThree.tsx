'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onPrev: () => void;
}

export default function StepThree({ onPrev }: Props) {
  const [form, setForm] = useState({
    tipo: '',
    pedido: '',
  });

  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = Object.values(form).every((v) => v.trim() !== '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (isValid) {
      alert('Formulario enviado con éxito ✅');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500">
          Especifica si es un reclamo o queja y describe lo que solicitas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 text-sm">
        <div className="relative">
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
            className="appearance-none w-full border border-gray-300 rounded px-4 py-2 pr-10 focus:outline-red-600"
          >
            <option value="">Seleccione si es un Reclamo o Queja *</option>
            <option value="Reclamo">Reclamo</option>
            <option value="Queja">Queja</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        </div>

        <textarea
          name="pedido"
          value={form.pedido}
          onChange={handleChange}
          placeholder="Pedido *"
          rows={5}
          required
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />

        {touched && !isValid && (
          <div className="text-red-600 text-sm font-medium">
            Por favor, completa todos los campos antes de enviar.
          </div>
        )}

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={onPrev}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
          >
            Anterior
          </button>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold transition"
          >
            ENVIAR
          </button>
        </div>
      </form>
    </div>
  );
}

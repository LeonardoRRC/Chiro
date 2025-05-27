'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onNext: () => void;
}

export default function StepOne({ onNext }: Props) {
  const [tipo, setTipo] = useState<'natural' | 'juridica'>('natural');
  const [form, setForm] = useState({
    nombre: '',
    documento: '',
    razon: '',
    email: '',
    numero: '',
    telefono: '',
    direccion: '',
    ciudad: '',
  });

  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = Object.values(form).every((val) => val.trim() !== '');

  const handleNext = () => {
    setTouched(true);
    if (isValid) onNext();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm text-gray-500">Llena tus datos personales antes de continuar con el reclamo</p>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="col-span-2 flex gap-8 items-center mb-2">
          <p className="font-semibold text-gray-700">Tipo de Persona:</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipo"
              value="natural"
              checked={tipo === 'natural'}
              onChange={() => setTipo('natural')}
              className="accent-red-600"
            />
            <span className="text-gray-700">Persona Natural</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipo"
              value="juridica"
              checked={tipo === 'juridica'}
              onChange={() => setTipo('juridica')}
              className="accent-red-600"
            />
            <span className="text-gray-700">Persona Jurídica</span>
          </label>
        </div>

        <input
          name="nombre"
          placeholder="Nombre y Apellido *"
          value={form.nombre}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />
        <div className="relative">
          <select
            required
            name="documento"
            value={form.documento}
            onChange={handleChange}
            className="appearance-none w-full border border-gray-300 rounded px-4 py-2 focus:outline-red-600 pr-10"
          >
            <option value="">Doc Identidad *</option>
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
            <option value="Pasaporte">Pasaporte</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4 pointer-events-none" />
        </div>

        <input
          name="razon"
          placeholder="Razón Social *"
          value={form.razon}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />
        <input
          name="email"
          placeholder="Email *"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />
        <input
          name="numero"
          placeholder="N° Documento *"
          value={form.numero}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />
        <input
          name="telefono"
          placeholder="Teléfono *"
          value={form.telefono}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />
        <input
          name="direccion"
          placeholder="Domicilio *"
          value={form.direccion}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />
        <input
          name="ciudad"
          placeholder="Ciudad *"
          value={form.ciudad}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-red-600"
        />

        {touched && !isValid && (
          <div className="col-span-2 text-red-600 text-sm font-medium">
            Por favor, completa todos los campos requeridos.
          </div>
        )}

        <div className="col-span-2 mt-4">
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-bold tracking-wide transition"
          >
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
}

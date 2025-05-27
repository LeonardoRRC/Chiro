'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const images = [
  '/gigantografias/1.jpg',
  '/gigantografias/2.jpg',
  '/gigantografias/3.jpg',
];

const sizes = [
  { label: '50 cm x 50 cm', price: 12 },
  { label: '100 cm x 50 cm', price: 18 },
  { label: '50 cm x 150 cm', price: 30 },
  { label: '50 cm x 200 cm', price: 35 },
  { label: '100 cm x 100 cm', price: 25 },
  { label: '100 cm x 150 cm', price: 36 },
  { label: '150 cm x 300 cm', price: 103 },
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState<{ label: string; price: number } | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const totalPrice = selectedSize ? selectedSize.price * quantity : 0;

  return (
    <section className="bg-white py-12 px-4 max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
      {/* Galería */}
      <div>
        <div className="w-full aspect-square relative mb-4 rounded overflow-hidden border">
          <Image src={selectedImage} alt="Producto" fill className="object-contain" />
        </div>
        <div className="flex space-x-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-20 h-20 relative cursor-pointer rounded border ${selectedImage === img ? 'ring-2 ring-red-600' : ''}`}
              onClick={() => setSelectedImage(img)}
            >
              <Image src={img} alt={`Miniatura ${index + 1}`} fill className="object-cover rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Detalles */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Gigantografía en Banner. Vinil. Vinil Microperforado</h1>

        <p className="text-red-600 text-xl font-semibold mb-1">
          S/ {totalPrice.toFixed(2)}
        </p>

        {selectedSize && (
          <p className="text-sm text-gray-600 mb-4">
            {quantity} unidad{quantity > 1 ? 'es' : ''} de {selectedSize.label}
          </p>
        )}

        <ul className="text-black mb-6 space-y-3 text-sm">
          {[
            'Impresiones full color de gran formato',
            'Alta calidad de resolución',
            'Material de gran durabilidad',
            'En Plot Center te asesoramos de principio a fin en tu publicidad',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-red-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-semibold mb-3">Medidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {sizes.map((size, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`w-full border rounded px-4 py-2 flex justify-between items-center text-sm font-medium transition 
                ${selectedSize?.label === size.label
                  ? 'border-red-600 bg-red-50 text-red-600'
                  : 'hover:border-gray-400 text-gray-700'
                }`}
            >
              {size.label}
              <span className="text-red-500 font-bold">S/ {size.price.toFixed(2)}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <label htmlFor="qty" className="text-sm font-medium">Cantidad:</label>
          <input
            id="qty"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-20 border border-gray-300 rounded px-3 py-1 text-center"
            min={1}
          />
        </div>

        <button
          disabled={!selectedSize}
          onClick={() => {
            if (!selectedSize) return;
            addItem({
              id: `${selectedImage}-${selectedSize.label}`,
              name: 'Gigantografía en Banner',
              price: selectedSize.price,
              quantity,
              size: selectedSize.label,
              image: selectedImage,
            });
          }}
          className={`w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3 rounded-full font-semibold transition 
            ${selectedSize ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-5 h-5" />
          Añadir al carrito ({totalPrice.toFixed(2)})
        </button>
      </div>
    </section>
  );
}

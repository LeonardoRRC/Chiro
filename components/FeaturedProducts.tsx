import Image from 'next/image';

const products = [
  {
    title: 'Sellos Personalizados',
    image: '/productos/1.jpg',
    link: '#',
  },
  {
    title: 'Impresiones de Gigantografías',
    image: '/productos/3.jpg',
    link: '/productos/gigantografias',
  },
  {
    title: 'Fotocheck PVC',
    image: '/productos/2.jpg',
    link: '#',
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-5xl font-extrabold text-black mb-4">
          Productos Destacados
        </h2>
  
        <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-lg mb-12">
          Conoce los productos más solicitados por nuestros clientes. Calidad, precisión y estilo para tus necesidades de impresión.
        </p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded shadow-md h-96"
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                <h3 className="text-3xl font-extrabold leading-tight">
                  {product.title}
                </h3>
                <a
                  href={product.link}
                  className="mt-5 text-lg font-semibold underline hover:text-gray-300 transition"
                >
                  Ver más
                </a>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-12">
          <a
            href="#"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Ver catálogo completo
          </a>
        </div>
      </div>
    </section>
  );
}

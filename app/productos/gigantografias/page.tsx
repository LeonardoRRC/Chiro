import ProductDetail from '@/components/cotizador/gigantografias/ProductDetail';
import WhyChooseUs from "@/components/WhyChooseUs";
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <ProductDetail />
      <div className="w-full flex justify-center">
        <div className="h-[1px] w-[80%] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
      </div>

      <WhyChooseUs />
    </>
  );
}

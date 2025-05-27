import HeroCarousel from '@/components/HeroCarousel';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialSlider from "@/components/TestimonialSlider";
import WhyChooseUs from "@/components/WhyChooseUs"

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedProducts />
      <TestimonialSlider />
      <WhyChooseUs />
    </>
  );
}

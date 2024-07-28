import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";
import TestimonialCards from "./components/TestimonialCards";
import WhyChooseUs from "./components/WhyChooseUs";
import Creators from './components/Creators'


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased ">
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <TestimonialCards />
      <Creators />
    </main>
  );
}

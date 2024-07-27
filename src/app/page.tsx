import FeaturedProducts from "./components/FeaturedProducts";
import HeroSection from "./components/HeroSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased ">
      <HeroSection />
      <FeaturedProducts />
    </main>
  );
}

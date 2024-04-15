import Hero from '../components/Hero';
import Donation from '../components/Donation';
import PetCarousel from '../components/PetCarousel';
import About from '../components/About';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <PetCarousel />
      <Donation />
    </>
  );
}

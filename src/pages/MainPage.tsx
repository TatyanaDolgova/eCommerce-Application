import AboutSection from '../components/AboutSection/AboutSection';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import ProductSection from '../components/ProductsSection/ProductSection';
import SpecialOffersSection from '../components/SpecialOffersSection/SpecialOffersSection';

const MainPage = () => {
  return (
    <>
      <Header></Header>
      <main>
        <HeroSection />
        <AboutSection />
        <SpecialOffersSection />
        <ProductSection />
      </main>
    </>
  );
};

export default MainPage;

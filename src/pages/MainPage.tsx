import AboutSection from '../components/AboutSection/AboutSection';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import SpecialOffersSection from '../components/SpecialOffersSection/SpecialOffersSection';

const MainPage = () => {
  return (
    <>
      <Header></Header>
      <main>
        <HeroSection />
        <AboutSection />
        <SpecialOffersSection />
      </main>
    </>
  );
};

export default MainPage;

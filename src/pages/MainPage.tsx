import AboutSection from '../components/AboutSection/AboutSection';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';

const MainPage = () => {
  return (
    <>
      <Header></Header>
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </>
  );
};

export default MainPage;

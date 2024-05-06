import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="wrapper hero-wrapper">
        <h1 className="hero-title">
          Don't panic, it's <span className="hero-title--high">Organic</span>
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;

import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <h1 className="hero-title">
          Don't panic, it's <span className="hero-title--high">Organic</span>
        </h1>

        <ul className="hero-links">
          <li>
            <Link className="hero-link sign-in-link" to="/login">
              Sign In
            </Link>
          </li>
          <li>
            <Link className="hero-link sign-up-link" to="/registration">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HeroSection;

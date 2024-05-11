import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-wrapper">
        <Link className="header-logo" to="/">
          Plantify
        </Link>
        <Link to="/home" className="header-link">
          Home
        </Link>
        <nav>
          <ul className="header-links">
            <li>
              <Link className="header-link sign-in-link" to="/login">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="header-link sign-up-link" to="/registration">
                Sign Up
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

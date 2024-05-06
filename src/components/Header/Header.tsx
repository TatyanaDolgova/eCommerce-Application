import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <Link className="header-logo" to="/">
        Platify
      </Link>
      <nav>
        <ul className="header-links">
          <li>
            <Link className="header-link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/registration">
              Registration
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

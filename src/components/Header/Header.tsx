import { Link } from 'react-router-dom';

import './Header.css';
import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';

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
        <BaseButton
          classes="log_out_button header-link"
          callback={async () => {
            await CustomerRepository.logOutCusromer();
          }}
          text="Log out"
          type="button"
        ></BaseButton>
      </div>
    </header>
  );
};

export default Header;

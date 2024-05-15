import { Squash as Hamburger } from 'hamburger-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link className="header-logo" to="/">
          Plantify
        </Link>
        <nav className="header-nav">
          <Link to="/home" className="header-link">
            Home
          </Link>
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
          <BaseButton
            classes="log_out_button header-link"
            callback={async () => {
              await CustomerRepository.logOutCusromer();
            }}
            text="Log out"
            type="button"
          ></BaseButton>
        </nav>
        <div className="header-hidden">
          <Hamburger toggled={isOpen} size={35} toggle={setOpen} color="#fff" />
        </div>
      </div>
    </header>
  );
};

export default Header;

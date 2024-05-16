import { Squash as Hamburger } from 'hamburger-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import { UserContext, UserData } from '../../app-context/UserContext';
import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';

const Header = () => {
  const userState = useContext(UserContext);
  const { updateState } = useContext(UserContext);
  const isLoggined = userState.user?.loginStatus;

  const navigate = useNavigate();
  const redirectToMain = () => navigate('/home');
  const [isOpen, setOpen] = useState(false);

  const LogOutButton = () => {
    if (isLoggined) {
      return (
        <BaseButton
          classes="log_out_button header-link"
          callback={async () => {
            await CustomerRepository.logOutCusromer();

            const userData: UserData = {
              loginStatus: false,
            };

            updateState({ user: userData });
            redirectToMain();
          }}
          text="Log out"
          type="button"
        ></BaseButton>
      );
    }

    return null;
  };

  const toggleMenu = () => {
    if (!isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    setOpen(!isOpen);
  };

  const closeMenu = () => {
    document.body.classList.remove('no-scroll');
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <Link className="header-logo" to="/">
          Plantify
        </Link>
        <nav className={`header-nav ${isOpen ? 'open' : ''}`}>
          <Link to="/home" className="header-link" onClick={closeMenu}>
            Home
          </Link>
          {isLoggined ? (
            <LogOutButton />
          ) : (
            <ul className="header-links">
              <li>
                <Link
                  className="header-link sign-in-link"
                  to="/login"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  className="header-link sign-up-link"
                  to="/registration"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
          <LogOutButton />
        </nav>
        <div
          className={`header-overlay ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        ></div>
        <div
          className="header-burger"
          data-testid="header_burger"
          onClick={toggleMenu}
        >
          <Hamburger toggled={isOpen} size={35} toggle={setOpen} color="#fff" />
        </div>
      </div>
    </header>
  );
};

export default Header;

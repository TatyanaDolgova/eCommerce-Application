import { Squash as Hamburger } from 'hamburger-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Header.css';
import { UserContext, UserData } from '../../app-context/UserContext';
import { cartRepository } from '../../services/CardRepository';
import { CustomerRepository } from '../../services/CustomerRepository';
import { userTokenStorage } from '../../services/LocalStorage';
import BaseButton from '../Button/Button';

const Header = () => {
  const userState = useContext(UserContext);
  const { updateState } = useContext(UserContext);
  const isLoggedIn = userState.user?.loginStatus;

  const navigate = useNavigate();
  const redirectToMain = () => navigate('/home');
  const [isOpen, setOpen] = useState(false);
  const [itemsQuantity, setItemsQuantity] = useState(0);

  const LogOutButton = () => {
    if (isLoggedIn) {
      return (
        <BaseButton
          classes="log_out_button header-link"
          callback={() => {
            CustomerRepository.logOutCusromer();

            const userData: UserData = {
              loginStatus: false,
            };

            updateState({ user: userData });
            userTokenStorage.clearLoginState();
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

  async function setQuantity() {
    try {
      const cart = await cartRepository.checkActiveCard();
      const quantity = cart.lineItems.length;

      setItemsQuantity(quantity);
    } catch {
      console.log('error fetching cart');
    }
  }

  useEffect(() => {
    void setQuantity();
  }, []);

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
          <Link to="/catalog" className="header-link" onClick={closeMenu}>
            Catalog
          </Link>
          <div className="cart-link-container">
            <Link
              to="/cart"
              className="user-profile-link cart-link"
              onClick={closeMenu}
            />
            {itemsQuantity !== 0 && (
              <span className="quantity-indicator">{itemsQuantity}</span>
            )}
          </div>
          {isLoggedIn ? (
            <div className="loggedin-container">
              <Link
                to="/userprofile"
                className="user-profile-link"
                onClick={closeMenu}
              />
              <LogOutButton />
            </div>
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

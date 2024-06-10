import { Squash as Hamburger } from 'hamburger-react';
import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import './Header.css';
import { UserContext, UserData } from '../../app-context/UserContext';
import { cartRepository } from '../../services/CardRepository';
import { CustomerRepository } from '../../services/CustomerRepository';
import { userTokenStorage } from '../../services/LocalStorage';
import BaseButton from '../Button/Button';

const Header = () => {
  const userContextState = useContext(UserContext);
  const { updateState } = useContext(UserContext);
  const isLoggedIn = userContextState.user.loginStatus;
  const productCount = userContextState.user.productCounter;

  const navigate = useNavigate();
  const redirectToMain = () => navigate('/home');
  const [isOpen, setOpen] = useState(false);

  const LogOutButton = () => {
    if (isLoggedIn) {
      return (
        <BaseButton
          classes="log_out_button"
          callback={() => {
            CustomerRepository.logOutCusromer();

            const userState: UserData = {
              loginStatus: true,
              productCounter: userContextState.user?.productCounter,
            };

            updateState({ user: userState });

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

      const userData: UserData = {
        loginStatus: userContextState.user?.loginStatus,
        productCounter: quantity,
      };

      updateState({ user: userData });
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
        <NavLink className="header-logo" to="/">
          Plantify
        </NavLink>
        <nav className={`header-nav ${isOpen ? 'open' : ''}`}>
          <NavLink to="/home" className="header-link" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/catalog" className="header-link" onClick={closeMenu}>
            Catalog
          </NavLink>
          <NavLink to="/about-us" className="header-link" onClick={closeMenu}>
            About Us
          </NavLink>
          <div className="cart-link-container">
            <Link
              to="/cart"
              className="user-profile-link cart-link"
              onClick={closeMenu}
            />
            {productCount !== 0 && (
              <span className="quantity-indicator">{productCount}</span>
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
                <Link className="sign-in-link" to="/login" onClick={closeMenu}>
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  className="sign-up-link"
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

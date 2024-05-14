import { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { UserContext, UserData } from '../../app-context/UserContext';
import { CustomerRepository } from '../../services/CustomerRepository';
import BaseButton from '../Button/Button';

const Header = () => {
  const userState = useContext(UserContext);
  const { updateState } = useContext(UserContext);
  const isLoggined = userState.user?.loginStatus;

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
          }}
          text="Log out"
          type="button"
        ></BaseButton>
      );
    }

    return null;
  };

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
        <LogOutButton />
      </div>
    </header>
  );
};

export default Header;

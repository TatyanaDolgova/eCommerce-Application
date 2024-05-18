import { JSX, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { UserContext } from '../app-context/UserContext';

import showToast from './notifications';

interface RouteGuardProps {
  children: JSX.Element;
}

export const RouteGuard = (params: RouteGuardProps) => {
  const currentLocation = useLocation();
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext.user?.loginStatus;

  if (isLoggedIn) {
    showToast(
      'You are already logged in. If you want to log in with another account, please log out first.',
      true,
    );

    return <Navigate to="/home" state={{ from: currentLocation }} />;
  } else {
    return params.children;
  }
};

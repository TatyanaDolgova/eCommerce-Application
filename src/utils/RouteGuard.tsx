import { JSX, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { UserContext } from '../app-context/UserContext';

interface RouteGuardProps {
  children: JSX.Element;
}

export const RouteGuard = (params: RouteGuardProps) => {
  const currentLocation = useLocation();
  const userContext = useContext(UserContext);
  const isLoggined = userContext.user?.loginStatus;

  if (isLoggined) {
    return <Navigate to="/home" state={{ from: currentLocation }} />;
  } else {
    return params.children;
  }
};

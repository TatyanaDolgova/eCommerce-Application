import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  UserContext,
  UserData,
  UserState,
} from '../../app-context/UserContext';
import {
  UserContextProps,
  UserContextProvider,
} from '../../app-context/UserContextProvider';

import Header from './Header';

const customHeaderRender = (
  app: JSX.Element,
  providerProps: UserContextProps,
) => {
  return render(
    <UserContextProvider {...providerProps}>
      <BrowserRouter>{app}</BrowserRouter>,
    </UserContextProvider>,
  );
};

test('Should show LogOut button when uses is loggined', () => {
  const providerProps: UserContextProps = {
    state: {
      updateState: () => {},
      user: {
        loginStatus: true,
      },
    },
  };

  customHeaderRender(<Header />, providerProps);
  expect(screen.getByText(/Log out/i)).toBeInTheDocument();
});

test('Should not show LogOut button when uses is loggined', () => {
  const providerProps: UserContextProps = {
    state: {
      updateState: () => {},
      user: {
        loginStatus: false,
      },
    },
  };

  customHeaderRender(<Header />, providerProps);
  expect(screen.queryByText(/Log out/i)).not.toBeInTheDocument();
});

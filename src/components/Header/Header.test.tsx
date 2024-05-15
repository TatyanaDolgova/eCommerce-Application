import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

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

test('Should not scroll when burger is opened', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );

  const burgerMenu = screen.getByTestId('header_burger');

  fireEvent.click(burgerMenu);
  expect(document.body).toHaveClass('no-scroll');
});

test('Should close burger after click on link', () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>,
  );

  const burgerMenu = screen.getByTestId('header_burger');

  fireEvent.click(burgerMenu);
  fireEvent.click(screen.getByText(/Home/i));
  expect(document.body).not.toHaveClass('no-scroll');
});

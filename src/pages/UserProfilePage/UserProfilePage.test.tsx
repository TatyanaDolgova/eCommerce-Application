import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import UserProfilePage from './UserProfilePage';

test('should have a page heading', () => {
  render(
    <BrowserRouter>
      <UserProfilePage />
    </BrowserRouter>,
  );

  const heading = screen.getByText('My Profile');

  expect(heading).toBeInTheDocument();
});

test('should have a personal info field', () => {
  render(
    <BrowserRouter>
      <UserProfilePage />
    </BrowserRouter>,
  );

  const personal = screen.getByText('Personal Info');

  expect(personal).toBeInTheDocument();
});

test('should have addresses field', () => {
  render(
    <BrowserRouter>
      <UserProfilePage />
    </BrowserRouter>,
  );

  const addressField = screen.getByText('Addresses');

  expect(addressField).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RegistrationPage from './RegistrationPage';

test('should have registration form', () => {
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>,
  );
  const registrationHeader = screen.getByText(/Get Started/i);

  expect(registrationHeader).toBeInTheDocument();
});

test('should not have logout button', () => {
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>,
  );

  expect(screen.queryByText(/Log out/i)).not.toBeInTheDocument();
});

test('should have signin button', () => {
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>,
  );
  const signin = screen.getAllByText(/Sign In/i);

  signin.forEach((link) => {
    expect(link).toBeInTheDocument();
  });
});

test('should have signup button', () => {
  render(
    <BrowserRouter>
      <RegistrationPage />
    </BrowserRouter>,
  );
  const signup = screen.getAllByText(/Sign Up/i);

  signup.forEach((link) => {
    expect(link).toBeInTheDocument();
  });
});

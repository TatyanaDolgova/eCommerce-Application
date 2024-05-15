import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LoginForm from './LoginForm';

test('should have password type by default', () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const passwordInput = screen.getByPlaceholderText(/Type your password/i);

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.getAttribute('type')).toBe('password');
});

test('should have text type after checking show password input', () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const passwordInput = screen.getByPlaceholderText(/Type your password/i);

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.getAttribute('type')).toBe('password');
});

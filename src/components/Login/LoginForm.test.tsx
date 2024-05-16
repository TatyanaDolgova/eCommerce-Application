import { fireEvent, render, screen } from '@testing-library/react';
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
  const checkbox = screen.getByTestId('password_checkbox');

  fireEvent.click(checkbox);

  const input = screen.getByPlaceholderText('Type your password');

  expect(input.getAttribute('type')).toBe('text');
});

test('should have password type after unchecking show password input', () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const checkbox = screen.getByTestId('password_checkbox');

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  const input = screen.getByPlaceholderText('Type your password');

  expect(input.getAttribute('type')).toBe('password');
});

test('should show error if email is not valid', async () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const input = screen.getByPlaceholderText('Type your email');

  fireEvent.change(input, { target: { value: 'test' } });

  const errorMessage = await screen.findByTestId('email_error_message');

  expect(errorMessage).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespace.',
  );
});

test('should show error if password is less than 8 characters', async () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const input = screen.getByPlaceholderText('Type your password');

  fireEvent.change(input, { target: { value: '1234' } });

  const errorMessage = await screen.findByTestId('password_error_message');

  expect(errorMessage).toHaveTextContent(
    'Password must be at least 8 characters long.',
  );
});

test('should show error if password is weak', async () => {
  render(
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>,
  );
  const input = screen.getByPlaceholderText('Type your password');

  fireEvent.change(input, { target: { value: '12345678' } });

  const errorMessage = await screen.findByTestId('password_error_message');

  expect(errorMessage).toHaveTextContent(
    'Password must contain at least one uppercase and one lowercase letter, one digit and one special character.',
  );
});

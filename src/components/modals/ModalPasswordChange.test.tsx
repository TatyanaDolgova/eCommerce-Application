import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ModalPassword from './ModalPasswordChange';

const mockData = {
  customerId: '1',
  customerVersion: 1,
  email: 'jo@jo.jo',
  closeModal: () => {
    console.log('element closed');
  },
};

test('should have password input', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );

  const passwordInput = screen.getByPlaceholderText('Enter your password');

  expect(passwordInput).toBeInTheDocument();
});

test('should have new password input', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );

  const newPasswordInput = screen.getByPlaceholderText(
    'Enter your new password',
  );

  expect(newPasswordInput).toBeInTheDocument();
});

test('should have a heading', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );

  const heading = screen.getByText('Change Password');

  expect(heading).toBeInTheDocument();
});

test('should have a save button', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );

  const saveButton = screen.getByText('Save');

  expect(saveButton).toBeInTheDocument();
});

test('should show error if password is less than 8 characters', async () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByPlaceholderText('Enter your password');

  fireEvent.change(input, { target: { value: '1234' } });

  const errorMessage = await screen.findByTestId('password_error_message');

  expect(errorMessage).toHaveTextContent(
    'Password must be at least 8 characters long.',
  );
});

test('should show error if new password is less than 8 characters', async () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByPlaceholderText('Enter your new password');

  fireEvent.change(input, { target: { value: '1234' } });

  const errorMessage = await screen.findByTestId('newPassword_error_message');

  expect(errorMessage).toHaveTextContent(
    'Password must be at least 8 characters long.',
  );
});

test('should have text type after checking show password input', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );
  const checkbox = screen.getByTestId('password_checkbox');

  fireEvent.click(checkbox);

  const input = screen.getByPlaceholderText('Enter your password');

  expect(input.getAttribute('type')).toBe('text');
});

test('should have password type after unchecking show password input', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );
  const checkbox = screen.getByTestId('password_checkbox');

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  const input = screen.getByPlaceholderText('Enter your password');

  expect(input.getAttribute('type')).toBe('password');
});

test('should have text type after checking show new password input', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );
  const checkbox = screen.getByTestId('new_password_checkbox');

  fireEvent.click(checkbox);

  const input = screen.getByPlaceholderText('Enter your new password');

  expect(input.getAttribute('type')).toBe('text');
});

test('should have password type after unchecking show new password input', () => {
  render(
    <BrowserRouter>
      <ModalPassword {...mockData} />
    </BrowserRouter>,
  );
  const checkbox = screen.getByTestId('new_password_checkbox');

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  const input = screen.getByPlaceholderText('Enter your new password');

  expect(input.getAttribute('type')).toBe('password');
});

import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ModalPersonalInfo from './ModalPersonalInfo';

const mockData = {
  customerBirthDate: '2011-01-01',
  customerName: 'Tania',
  customerLastName: 'Jo',
  customerId: '1',
  customerVersion: 1,
  email: 'jo@jo.jo',
  closeModal: () => {
    console.log('element closed');
  },
};

test('should have first name input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const firstNameInput = screen.getByLabelText('First Name');

  expect(firstNameInput).toBeInTheDocument();
});

test('should have content in first name input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const firstNameInput = screen.getByLabelText('First Name');

  expect(firstNameInput).toHaveValue();
});

test('should have last name input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const lastNameInput = screen.getByLabelText('Last Name');

  expect(lastNameInput).toBeInTheDocument();
});

test('should have content in last name input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const lastNameInput = screen.getByLabelText('Last Name');

  expect(lastNameInput).toHaveValue();
});

test('should have birth date input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const birthDateInput = screen.getByLabelText('Date of Birth');

  expect(birthDateInput).toBeInTheDocument();
});

test('should have content in birth date input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const birthDateInput = screen.getByLabelText('Date of Birth');

  expect(birthDateInput).toHaveValue();
});

test('should have email input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const emailInput = screen.getByLabelText('Email');

  expect(emailInput).toBeInTheDocument();
});

test('should have content in email input', () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );

  const emailInput = screen.getByLabelText('Email');

  expect(emailInput).toHaveValue();
});

test('should show error if email is not valid', async () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByLabelText('Email');

  fireEvent.change(input, { target: { value: 'test' } });

  const errorMessage = await screen.findByTestId('email_error_message');

  expect(errorMessage).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com) and should not contain whitespaces.',
  );
});

test('should show error if name is not valid', async () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByLabelText('First Name');

  fireEvent.change(input, { target: { value: 'test1' } });

  const errorMessage = await screen.findByTestId('name_error_message');

  expect(errorMessage).toHaveTextContent(
    'First name should not contain numbers or special characters',
  );
});

test('should show error if name is empty', async () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByLabelText('First Name');

  fireEvent.change(input, { target: { value: '' } });

  const errorMessage = await screen.findByTestId('name_error_message');

  expect(errorMessage).toHaveTextContent('First name is required');
});

test('should show error if last name is not valid', async () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByLabelText('Last Name');

  fireEvent.change(input, { target: { value: 'test1' } });

  const errorMessage = await screen.findByTestId('lastName_error_message');

  expect(errorMessage).toHaveTextContent(
    'Last name should not contain numbers or special characters',
  );
});

test('should show error if last name is empty', async () => {
  render(
    <BrowserRouter>
      <ModalPersonalInfo {...mockData} />
    </BrowserRouter>,
  );
  const input = screen.getByLabelText('Last Name');

  fireEvent.change(input, { target: { value: '' } });

  const errorMessage = await screen.findByTestId('lastName_error_message');

  expect(errorMessage).toHaveTextContent('Last name is required');
});

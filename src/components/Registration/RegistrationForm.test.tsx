import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

test('should have an email input', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const emailInput = screen.getByPlaceholderText(/email/i);

  expect(emailInput).toBeInTheDocument();
  expect(emailInput.getAttribute('type')).toBe('text');
});

test('should have a password input', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const passwordInput = screen.getByPlaceholderText(/password/i);

  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput.getAttribute('type')).toBe('password');
});

test('should have a first name input', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const fnameInput = screen.getByPlaceholderText(/first name/i);

  expect(fnameInput).toBeInTheDocument();
  expect(fnameInput.getAttribute('type')).toBe('text');
});

test('should have a last name input', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const lnameInput = screen.getByPlaceholderText(/last name/i);

  expect(lnameInput).toBeInTheDocument();
  expect(lnameInput.getAttribute('type')).toBe('text');
});

test('should have a birth date input', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const bdateInput = screen.getByLabelText(/Date of Birth/i);

  expect(bdateInput).toBeInTheDocument();
  expect(bdateInput.getAttribute('type')).toBe('date');
});

test('should have two street inputs', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const streetInputs = screen.getAllByPlaceholderText(/Street/i);

  streetInputs.forEach((input) => {
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('type')).toBe('text');
  });
});

test('should have two city inputs', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const cityInputs = screen.getAllByPlaceholderText(/City/i);

  cityInputs.forEach((input) => {
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('type')).toBe('text');
  });
});

test('should have two postcode inputs', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const postcodeInputs = screen.getAllByPlaceholderText(/Postal Code/i);

  postcodeInputs.forEach((input) => {
    expect(input).toBeInTheDocument();
    expect(input.getAttribute('type')).toBe('text');
  });
});

test('should have two country inputs', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const countryInputs = screen.getAllByText(/USA/i);

  countryInputs.forEach((input) => {
    expect(input).toBeInTheDocument();
  });
});

test('should have default shipping checkbox', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const defaultShippingInput = screen.getByLabelText(
    /default shipping address/i,
  );

  expect(defaultShippingInput).toBeInTheDocument();
  expect(defaultShippingInput.getAttribute('type')).toBe('checkbox');
});

test('should have default billing checkbox', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const defaultBillingInput = screen.getByLabelText(/default billing address/i);

  expect(defaultBillingInput).toBeInTheDocument();
  expect(defaultBillingInput.getAttribute('type')).toBe('checkbox');
});

test('should have the same address checkbox', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const sameAddressInput = screen.getByLabelText(/use the same address/i);

  expect(sameAddressInput).toBeInTheDocument();
  expect(sameAddressInput.getAttribute('type')).toBe('checkbox');
});

test('should disable billing address if use the same checkbox is active', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const sameAddressInput = screen.getByLabelText(/use the same address/i);
  const billingStreetInput = screen.getByTestId('street2');
  const billingCityInput = screen.getByTestId('city2');
  const billingPostCodeInput = screen.getByTestId('postcode2');
  const billingCountryInput = screen.getByTestId('country2');

  fireEvent.click(sameAddressInput);

  expect(billingStreetInput.classList).toContain('disabled-input');
  expect(billingCityInput.classList).toContain('disabled-input');
  expect(billingPostCodeInput.classList).toContain('disabled-input');
  expect(billingCountryInput.classList).toContain('disabled-input');
});

test('should have a link to login page', () => {
  render(
    <BrowserRouter>
      <RegistrationForm />
    </BrowserRouter>,
  );
  const loginLink = screen.getByText(/Sign In/i);

  expect(loginLink).toBeInTheDocument();
});

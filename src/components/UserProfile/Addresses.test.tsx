import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Addresses from './Addresses';

test('should have shipping addresses field', () => {
  render(
    <BrowserRouter>
      <Addresses />
    </BrowserRouter>,
  );

  const shipping = screen.getByText('Shipping Addresses');

  expect(shipping).toBeInTheDocument();
});

test('should have billing addresses field', () => {
  render(
    <BrowserRouter>
      <Addresses />
    </BrowserRouter>,
  );

  const billing = screen.getByText('Billing Addresses');

  expect(billing).toBeInTheDocument();
});

test('should have an add button', () => {
  render(
    <BrowserRouter>
      <Addresses />
    </BrowserRouter>,
  );

  const add = screen.getByText('Add');

  expect(add).toBeInTheDocument();
});

test('should open a modal on add button click', () => {
  render(
    <BrowserRouter>
      <Addresses />
    </BrowserRouter>,
  );

  const add = screen.getByText('Add');

  fireEvent.click(add);

  const addModalLabel = screen.getByText('Add a new address');

  expect(addModalLabel).toBeInTheDocument();
});

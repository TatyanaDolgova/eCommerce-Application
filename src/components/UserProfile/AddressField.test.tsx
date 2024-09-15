import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AddressField from './AddressField';

const mockData = {
  address: {
    streetName: 'Yamhill',
    city: 'Portland',
    country: 'US',
    postalCode: '12345',
  },
  customerID: '1',
  customerVersion: 1,
  updateFunction: () => {
    console.log('element closed');
  },
};

test('should have street field', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const street = screen.getByText('Street');

  expect(street).toBeInTheDocument();
});

test('should have city field', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const city = screen.getByText('City');

  expect(city).toBeInTheDocument();
});

test('should have country field', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const country = screen.getByText('Country');

  expect(country).toBeInTheDocument();
});

test('should have postcode field', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const postcode = screen.getByText('Postal Code');

  expect(postcode).toBeInTheDocument();
});

test('should have an edit button', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const edit = screen.getByText('Edit');

  expect(edit).toBeInTheDocument();
});

test('should have a delete button', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const deleteBtn = screen.getByText('Delete');

  expect(deleteBtn).toBeInTheDocument();
});

test('should open a modal on edit button click', () => {
  render(
    <BrowserRouter>
      <AddressField {...mockData} />
    </BrowserRouter>,
  );

  const edit = screen.getByText('Edit');

  fireEvent.click(edit);

  const modalHeading = screen.getByText('Edit address');

  expect(modalHeading).toBeInTheDocument();
});

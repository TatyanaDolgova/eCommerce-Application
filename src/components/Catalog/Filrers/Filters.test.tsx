import { fireEvent, render, screen } from '@testing-library/react';

import Filters from './Filters';

const mockProps = {
  onPriceChange: jest.fn(),
  onSizeChange: jest.fn(),
  onResetFilters: jest.fn(),
};

test('renders Filters component correctly', () => {
  render(<Filters {...mockProps} />);

  const headerElement = screen.getByText(/Price:/i);

  expect(headerElement).toBeInTheDocument();

  fireEvent.click(headerElement);

  const minPriceInput = screen.getByLabelText(/Min:/i);
  const maxPriceInput = screen.getByLabelText(/Max:/i);
  const sizeSelect = screen.getByLabelText(/Size:/i);
  const applyButton = screen.getByText(/Apply/i);
  const resetButton = screen.getByText(/Reset/i);

  expect(minPriceInput).toBeInTheDocument();
  expect(maxPriceInput).toBeInTheDocument();
  expect(sizeSelect).toBeInTheDocument();
  expect(applyButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test('the filters header is displayed and calls toggleOpen function when clicked', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const filtersContent = screen.getByTestId('filters-content');

  expect(filtersContent).toBeInTheDocument();
});

test('changes the minimum price if the entered value exceeds the maximum price', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const minPriceInput = screen.getByLabelText(/Min:/i);
  const maxPriceInput = screen.getByLabelText(/Max:/i);

  fireEvent.change(maxPriceInput, { target: { value: 80 } });
  fireEvent.change(minPriceInput, { target: { value: 90 } });

  expect(minPriceInput).toHaveValue(90);
  expect(maxPriceInput).toHaveValue(90);
});

test('changes the maximum price if the entered value is less than the minimum price', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const minPriceInput = screen.getByLabelText(/Min:/i);
  const maxPriceInput = screen.getByLabelText(/Max:/i);

  fireEvent.change(minPriceInput, { target: { value: 70 } });
  fireEvent.change(maxPriceInput, { target: { value: 60 } });

  expect(minPriceInput).toHaveValue(60);
  expect(maxPriceInput).toHaveValue(60);
});

test('calls the handler function when the "Apply" button is clicked', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const applyButton = screen.getByText('Apply');

  fireEvent.click(applyButton);
  expect(mockProps.onPriceChange).toHaveBeenCalled();
  expect(mockProps.onSizeChange).toHaveBeenCalled();
});

test('calls the handler function when the "Reset" button is clicked', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const resetButton = screen.getByText('Reset');

  fireEvent.click(resetButton);
  expect(mockProps.onResetFilters).toHaveBeenCalled();
});

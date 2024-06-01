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

test('заголовок фильтров отображается и вызывает функцию toggleOpen при клике', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const filtersContent = screen.getByTestId('filters-content');

  expect(filtersContent).toBeInTheDocument();
});

test('изменяет минимальную цену, если введенное значение больше максимальной цены', () => {
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

test('изменяет максимальную цену, если введенное значение меньше минимальной цены', () => {
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

test('вызывает функцию обработчика при нажатии на кнопку "Apply"', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const applyButton = screen.getByText('Apply');

  fireEvent.click(applyButton);
  expect(mockProps.onPriceChange).toHaveBeenCalled();
  expect(mockProps.onSizeChange).toHaveBeenCalled();
});

test('вызывает функцию обработчика при нажатии на кнопку "Reset"', () => {
  render(<Filters {...mockProps} />);

  const filtersHeader = screen.getByText(/Price:/i);

  expect(filtersHeader).toBeInTheDocument();

  fireEvent.click(filtersHeader);

  const resetButton = screen.getByText('Reset');

  fireEvent.click(resetButton);
  expect(mockProps.onResetFilters).toHaveBeenCalled();
});

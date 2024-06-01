import { fireEvent, render, screen } from '@testing-library/react';

import Search from './Search';

const mockOnSearch = jest.fn();

const mockProps = {
  currentCategory: 'Category1',
  onSearch: mockOnSearch,
};

test('renders search input and button correctly', () => {
  render(<Search {...mockProps} />);

  const searchInput = screen.getByPlaceholderText('Search products...');
  const searchButton = screen.getByText('Search...');

  expect(searchInput).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('updates query state on input change', () => {
  render(<Search {...mockProps} />);

  const searchInput = screen.getByPlaceholderText('Search products...');

  fireEvent.change(searchInput, { target: { value: 'new query' } });

  expect(searchInput).toHaveValue('new query');
});

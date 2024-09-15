import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Breadcrumbs from './Breadcrumbs';

const defaultProps = {
  breadcrumbs: [],
  onCategorySelect: jest.fn(),
  onFetchCategories: jest.fn(),
};

test('renders Home and All products links', () => {
  render(
    <BrowserRouter>
      <Breadcrumbs {...defaultProps} />
    </BrowserRouter>,
  );

  const homeLink = screen.getByText('Home');
  const allProductsLink = screen.getByText('All products');

  expect(homeLink).toBeInTheDocument();
  expect(allProductsLink).toBeInTheDocument();
});

test('renders breadcrumb items correctly', () => {
  const breadcrumbs = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ];

  render(
    <BrowserRouter>
      <Breadcrumbs {...defaultProps} breadcrumbs={breadcrumbs} />
    </BrowserRouter>,
  );

  breadcrumbs.forEach((breadcrumb) => {
    expect(screen.getByText(breadcrumb.name)).toBeInTheDocument();
  });
});

test('clicking on "All products" link calls the correct handler', () => {
  render(
    <BrowserRouter>
      <Breadcrumbs {...defaultProps} />
    </BrowserRouter>,
  );

  const allProductsLink = screen.getByText('All products');

  fireEvent.click(allProductsLink);

  expect(defaultProps.onCategorySelect).toHaveBeenCalledWith('');
  expect(defaultProps.onFetchCategories).toHaveBeenCalled();
});

test('clicking on a category link calls the correct handler', () => {
  const breadcrumbs = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ];

  render(
    <BrowserRouter>
      <Breadcrumbs {...defaultProps} breadcrumbs={breadcrumbs} />
    </BrowserRouter>,
  );

  breadcrumbs.forEach((breadcrumb) => {
    const categoryLink = screen.getByText(breadcrumb.name);

    fireEvent.click(categoryLink);
    expect(defaultProps.onCategorySelect).toHaveBeenCalledWith(breadcrumb.id);
  });
});

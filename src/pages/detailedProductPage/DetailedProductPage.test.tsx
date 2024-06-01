import { Product } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProductRepository from '../../services/ProductRepository';

import DetailedProductPage from './DetailedProductPage';

test('should show srinner while loading data', () => {
  class MockProductRepository extends ProductRepository {
    getProduct(productID: string): Promise<Product | undefined> {
      return new Promise((resolve) => {
        console.log(this);
        resolve(undefined);
      });
    }
  }

  const mockProductRepository = new MockProductRepository();

  render(
    <BrowserRouter>
      <DetailedProductPage productRepository={mockProductRepository} />
    </BrowserRouter>,
  );

  const spinner = screen.getByTestId('spinner-test');

  expect(spinner).toBeInTheDocument();
});

import { Product } from '@commercetools/platform-sdk';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProductRepository from '../../services/ProductRepository';

import DetailedProductPage from './DetailedProductPage';
import { testProduct } from './TestData';

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

test('should show single image without modal if single image was returned', async () => {
  class MockProductRepository extends ProductRepository {
    getProduct(productID: string): Promise<Product | undefined> {
      return new Promise((resolve) => {
        console.log(this);
        resolve(testProduct);
      });
    }
  }

  const mockProductRepository = new MockProductRepository();

  render(
    <BrowserRouter>
      <DetailedProductPage productRepository={mockProductRepository} />
    </BrowserRouter>,
  );

  await waitFor(() => {
    const singleImage = screen.getByTestId('single_image');

    expect(singleImage).toBeInTheDocument();
  });
});

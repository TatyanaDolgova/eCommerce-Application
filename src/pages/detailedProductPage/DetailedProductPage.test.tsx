import { Product } from '@commercetools/platform-sdk';
import { render, screen } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProductRepository from '../../services/ProductRepository';

import DetailedProductPage from './DetailedProductPage';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: PropsWithChildren) => (
    <div data-testid="swiper-testid">{children}</div>
  ),
  SwiperSlide: ({ children }: PropsWithChildren) => (
    <div data-testid="swiper-slide-testid">{children}</div>
  ),
}));

jest.mock('swiper/modules', () => ({
  Navigation: () => null,
  Pagination: () => null,
  Scrollbar: () => null,
  A11y: () => null,
}));

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

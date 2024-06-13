import { Product } from '@commercetools/platform-sdk';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProductRepository from '../../services/ProductRepository';

import DetailedProductPage from './DetailedProductPage';
import { getTestProduct } from './TestData';

test('should show spinner while loading data', () => {
  class MockProductRepository extends ProductRepository {
    getProduct(productID: string): Promise<Product | undefined> {
      return new Promise((resolve) => {
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
        resolve(getTestProduct(1));
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

test('should show slider without modal if several image was returned', async () => {
  class MockProductRepository extends ProductRepository {
    getProduct(productID: string): Promise<Product | undefined> {
      return new Promise((resolve) => {
        resolve(getTestProduct(2));
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
    const images = screen.getAllByTestId('slider');

    images.forEach((singleImage) => {
      expect(singleImage).toBeInTheDocument();
    });
    expect(images).toHaveLength(2);
  });
});

test('should show modal single image if single image was returned and clicked', async () => {
  class MockProductRepository extends ProductRepository {
    getProduct(productID: string): Promise<Product | undefined> {
      return new Promise((resolve) => {
        resolve(getTestProduct(1));
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

  const singleImage = screen.getByTestId('single_image');

  fireEvent.click(singleImage);

  const modalSingleImage = screen.getByTestId('modal_single_image');

  expect(modalSingleImage).toBeInTheDocument();
});

test('should show modal slider if seversl images was returned and clicked', async () => {
  class MockProductRepository extends ProductRepository {
    getProduct(productID: string): Promise<Product | undefined> {
      return new Promise((resolve) => {
        resolve(getTestProduct(2));
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
    const images = screen.getAllByTestId('slider');

    images.forEach((singleImage) => {
      expect(singleImage).toBeInTheDocument();
    });
    expect(images).toHaveLength(2);
  });

  const images = screen.getAllByTestId('slider');

  fireEvent.click(images[0]);

  const modalSliderImages = screen.getAllByTestId('modal_slider');

  modalSliderImages.forEach((modalSliderImage) => {
    expect(modalSliderImage).toBeInTheDocument();
  });
});

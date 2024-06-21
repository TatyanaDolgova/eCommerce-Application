import { Product } from '@commercetools/platform-sdk';

export const getTestProduct = (imageCount: number) => {
  const testProduct: Product = {
    id: 'test',
    version: 0,
    createdAt: 'test',
    lastModifiedAt: 'test',
    productType: {
      typeId: 'product-type',
      id: 'test',
    },
    masterData: {
      published: true,
      hasStagedChanges: true,
      staged: {
        name: {
          'en-US': 'test',
        },
        categories: [],
        slug: {
          'en-US': 'test',
        },
        variants: [],
        searchKeywords: {
          'en-US': [],
        },
        masterVariant: {
          id: 0,
          images: [],
        },
      },
      current: {
        name: {
          'en-US': 'test',
        },
        categories: [],
        slug: {
          'en-US': 'test',
        },
        variants: [],
        searchKeywords: {
          'en-US': [],
        },
        masterVariant: {
          id: 0,
          images: [],
        },
      },
    },
  };

  const image = {
    url: 'test image',
    dimensions: {
      w: 0,
      h: 0,
    },
  };

  for (let i = 0; i < imageCount; i++) {
    testProduct.masterData.current.masterVariant.images?.push(image);
  }

  return testProduct;
};

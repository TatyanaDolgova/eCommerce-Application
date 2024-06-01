import { Product } from '@commercetools/platform-sdk';

export const testProduct: Product = {
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
        images: [
          {
            url: 'test image',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
        ],
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
        images: [
          {
            url: 'test image',
            dimensions: {
              w: 0,
              h: 0,
            },
          },
        ],
      },
    },
  },
};

export const getTestProduct = (imageCount: number) => {
  const result = testProduct;

  for (let i = 1; i < imageCount; i++) {
    const images = result.masterData.current.masterVariant.images;

    if (images) {
      result.masterData.current.masterVariant.images?.push(images[0]);
    }
  }

  return result;
};

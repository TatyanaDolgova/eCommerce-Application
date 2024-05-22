import { Product } from '@commercetools/platform-sdk';
import React from 'react';

import ProductCard from '../ProductCard/ProductCard';

import './ProductList.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

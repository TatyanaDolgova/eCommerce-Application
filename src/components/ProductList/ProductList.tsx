import { Product } from '@commercetools/platform-sdk';
import React, { useEffect, useState } from 'react';

import ProductCard from '../ProductCard/ProductCard';
import Spinner from '../Spinner/Spinner';

import './ProductList.css';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [products]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;

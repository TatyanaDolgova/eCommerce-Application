import { Product } from '@commercetools/platform-sdk';
import React from 'react';

import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productName = product.masterData.current.name['en-US'];
  const productDescription = product.masterData.current.description?.['en-US'];
  const productImage = product.masterData.current.masterVariant.images?.[0].url;

  return (
    <div className="card">
      <img className="card-image" src={productImage} alt="" />
      <div className="card-info">
        <div className="card-title">{productName}</div>
        <div className="card-descr">{productDescription}</div>
      </div>
    </div>
  );
};

export default ProductCard;

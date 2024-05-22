import { Product } from '@commercetools/platform-sdk';
import React from 'react';

import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product);

  const plantData = product.masterData.current;
  const productName = plantData.name['en-US'];
  const productDescription = plantData.metaDescription?.['en-US'];
  const productImage = plantData.masterVariant.images?.[0].url;
  const priceOld = plantData.masterVariant.prices?.[0].value.centAmount;

  return (
    <div className="card">
      <img className="card-image" src={productImage} alt="" />
      <div className="card-info">
        <div className="card-title">{productName}</div>
        <div className="card-descr">{productDescription}</div>
        <div className="price-container">
          <div className="price-old">{priceOld}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { Product, ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: ProductProjection;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productSlug: string = product.slug['en-US'];
  const productID = product.id;
  const productName = product.name['en-US'];
  const productDescription = product.metaDescription?.['en-US'];
  const productImage = product.masterVariant.images?.[0].url;
  const priceOld = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0;
  const priceNew =
    product.masterVariant.prices?.[0].discounted?.value.centAmount ?? 0;

  return (
    <div className="card">
      <img className="card-image" src={productImage} alt="" />
      <div className="card-info">
        <div className="card-title">{productName}</div>
        <div className="card-descr">{productDescription}</div>
        <Link
          className="details_link"
          to={`/detailed/${productSlug}`}
          state={productID}
        >
          View Details
        </Link>
        <div className="price-container">
          <div className="price-old">{Math.floor(priceOld / 100)} €</div>
          <div className="price-new">{Math.floor(priceNew / 100)} €</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { Product } from '@commercetools/platform-sdk';
import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productName = product.masterData.current.name['en-US'];
  const productDescription = product.masterData.current.description?.['en-US'];
  const productImage = product.masterData.current.masterVariant.images?.[0].url;
  const productSlug: string = product.masterData.current.slug['en-US'];

  return (
    <div className="card">
      <img className="card-image" src={productImage} alt="" />
      <div className="card-info">
        <div className="card-title">{productName}</div>
        <div className="card-descr">{productDescription}</div>
        <Link className="link" to={`/catalog/${productSlug}`}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

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
  const productID = product.id;

  const plantData = product.masterData.current;
  const productName = plantData.name['en-US'];
  const productDescription = plantData.metaDescription?.['en-US'];
  const productImage = plantData.masterVariant.images?.[0].url;
  const priceOld = plantData.masterVariant.prices?.[0].value.centAmount;
  const priceNew =
    plantData.masterVariant.prices?.[0].discounted?.value.centAmount;

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
          <div className="price-old">{priceOld}</div>
          <div className="price-new">{priceNew}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

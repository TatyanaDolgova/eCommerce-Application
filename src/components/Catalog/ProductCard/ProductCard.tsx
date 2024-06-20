import { Product, ProductProjection } from '@commercetools/platform-sdk';
import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  cart: string[];
  isAddingToCart: boolean;
  onAddToCart: (productId: string) => void;
  product: ProductProjection;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  cart,
  isAddingToCart,
}) => {
  const productSlug: string = product.slug['en-US'];
  const productID = product.id;
  const productName = product.name['en-US'];
  const productDescription = product.metaDescription?.['en-US'];
  const productImage = product.masterVariant.images?.[0].url;
  const priceOld = product.masterVariant.prices?.[0]?.value?.centAmount ?? 0;
  const priceNew =
    product.masterVariant.prices?.[0].discounted?.value.centAmount ?? null;

  const isInCart = cart.includes(productID);

  return (
    <div className="card">
      <img className="card-image" src={productImage} alt="" />
      <div className="card-info">
        <div className="card-title">{productName}</div>
        <div className="card-descr">{productDescription}</div>
        <Link
          className="details_link"
          to={`/catalog/${productSlug}`}
          state={productID}
        >
          View Details
        </Link>
        {priceNew ? (
          <div className="price-container">
            <div className="price-old">{(priceOld / 100).toFixed(2)} €</div>
            <div className="price-new">{(priceNew / 100).toFixed(2)} €</div>
          </div>
        ) : (
          <div className="price-container">
            <div className="price-norm">{(priceOld / 100).toFixed(2)} €</div>
          </div>
        )}
        {isInCart ? (
          <div className="added-to-cart">Already in Cart</div>
        ) : (
          <button
            className="add-to-cart-button"
            onClick={() => onAddToCart(productID)}
            disabled={isAddingToCart}
          >
            {'Add to Cart 🛒'}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

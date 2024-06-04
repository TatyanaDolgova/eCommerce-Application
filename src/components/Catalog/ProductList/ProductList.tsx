import { ProductProjection } from '@commercetools/platform-sdk';

import ProductCard from '../ProductCard/ProductCard';

import './ProductList.css';

interface ProductListProps {
  cart: string[];
  onAddToCart: (productId: string) => void;

  products: ProductProjection[];
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  cart,
}) => {
  return (
    <>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            cart={cart}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;

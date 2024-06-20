import { ProductProjection } from '@commercetools/platform-sdk';

import ProductCard from '../ProductCard/ProductCard';

import './ProductList.css';

interface ProductListProps {
  cart: string[];
  isAddingToCart: boolean;
  onAddToCart: (productId: string) => void;
  products: ProductProjection[];
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
  cart,
  isAddingToCart,
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
            isAddingToCart={isAddingToCart}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;

import { ProductProjection } from '@commercetools/platform-sdk';

import ProductCard from '../ProductCard/ProductCard';

import './ProductList.css';

interface ProductListProps {
  products: ProductProjection[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <>
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductList;

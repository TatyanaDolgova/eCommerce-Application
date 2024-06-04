import { Category, ProductProjection } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import Breadcrumbs from '../../components/Catalog/Breadcrumbs/Breadcrumbs';
import CategorySidebar from '../../components/Catalog/CategorySidebar/CategorySidebar';
import Filters from '../../components/Catalog/Filters/Filters';
import ProductList from '../../components/Catalog/ProductList/ProductList';
import Search from '../../components/Catalog/Search/Search';
import SortingSelect from '../../components/Catalog/SortingSelect/SortingSelect';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinners/Spinner-category';
import { cartRepository } from '../../services/CardRepository';
import ProductRepository from '../../services/ProductRepository';

import './CatalogPage.css';

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [sortedProducts, setSortedProducts] = useState<ProductProjection[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [sortMethod, setSortMethod] = useState<string>('price asc');
  const [searhcQuery, setSearchQuery] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [size, setSize] = useState<string>('');
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      setLoading(true);
      const productRepository = new ProductRepository();
      const productsResponse = await productRepository.getProducts(
        sortMethod,
        searhcQuery,
        minPrice,
        maxPrice,
        size,
        currentCategory,
      );

      setLoading(false);
      setProducts(productsResponse);
      setSortedProducts(productsResponse);
      setSearchError(null);

      if (productsResponse.length === 0) {
        setSearchError('Nothing found');
      }
    } catch (error) {
      setSearchError('Error fetching products');
    }
  }

  const createNewCart = async () => {
    try {
      const newCart = await cartRepository.createCart();

      setCartId(newCart.id);
      localStorage.setItem('cart_JSFE2023Q4', 'true');
    } catch (createError) {
      throw Error('Error creating new cart');
    }
  };

  async function fetchCart() {
    const savedCart = localStorage.getItem('cartId_JSFE2023Q4');

    if (savedCart) {
      try {
        const activeCart = await cartRepository.checkActiveCard();
        const cartItems = activeCart.lineItems.map((item) => item.productId);

        setCart(cartItems);
      } catch (error) {
        await createNewCart();
      }
    } else {
      await createNewCart();
    }
  }

  useEffect(() => {
    void fetchCart();
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [sortMethod, currentCategory, searhcQuery, maxPrice, minPrice, size]);

  const updateBreadcrumbs = async (category: Category | null) => {
    if (category) {
      const newBreadcrumb = { id: category.id, name: category.name['en-US'] };

      try {
        if (category.parent) {
          const productRepository = new ProductRepository();
          const productsResponse = await productRepository.getCategoryById(
            category.parent.id,
          );

          setBreadcrumbs(() => {
            return [
              { id: productsResponse.id, name: productsResponse.name['en-US'] },
              newBreadcrumb,
            ];
          });
        } else {
          setBreadcrumbs(() => {
            return [newBreadcrumb];
          });
        }
      } catch (error) {
        throw new Error('Error updating breadcrumbs');
      }
    } else {
      setBreadcrumbs(() => {
        return [];
      });
    }
  };

  const handleCategorySelect = async (categoryId: string) => {
    try {
      const productRepository = new ProductRepository();

      setCurrentCategory(categoryId);
      setSearchQuery('');
      setSearchError(null);

      if (categoryId) {
        const category = await productRepository.getCategoryById(categoryId);

        await updateBreadcrumbs(category);
      } else {
        await updateBreadcrumbs(null);
      }
    } catch (error) {
      throw new Error('Error fetching products for category');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (method: string) => {
    setSortMethod(method);
  };

  const handlePriceChange = (minPriceArg: number, maxPriceArg: number) => {
    setMinPrice(minPriceArg);
    setMaxPrice(maxPriceArg);
  };

  const handleSizeChange = (sizeArg: string) => {
    setSize(sizeArg);
  };

  const handleResetFilters = () => {
    setMinPrice(0);
    setMaxPrice(100);
    setSize('');
  };

  const handleAddToCart = async (productId: string) => {
    try {
      let newCartId = cartId;

      if (!newCartId) {
        const newCart = await cartRepository.createCart();

        newCartId = newCart.id;
        setCartId(newCartId);
        localStorage.setItem('cart_JSFE2023Q4', 'true');
      }
      if (newCartId) await cartRepository.addToCart(newCartId, productId);
      setCart([...cart, productId]);
    } catch {
      throw new Error('Error adding to cart');
    }
  };

  return (
    <>
      <Header />
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        onCategorySelect={handleCategorySelect}
        onFetchCategories={fetchProducts}
      />
      <div className="catalog-page">
        <CategorySidebar
          onCategorySelect={handleCategorySelect}
          currentCategory={currentCategory}
        />
        <div className="main-content">
          <div className="settings-container">
            <Search onSearch={handleSearch} currentCategory={currentCategory} />
            <SortingSelect
              sortMethod={sortMethod}
              onSortChange={handleSortChange}
            />

            <Filters
              onPriceChange={handlePriceChange}
              onResetFilters={handleResetFilters}
              onSizeChange={handleSizeChange}
            />
          </div>
          {loading ? (
            <Spinner />
          ) : searchError ? (
            <div className="search-error">{searchError}</div>
          ) : (
            <ProductList
              products={products}
              onAddToCart={handleAddToCart}
              cart={cart}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
